import 'dotenv/config'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { Request, Response } from 'express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './UserResolver'
import { createConnection } from 'typeorm'
import { DataResolver } from './DataResolver'
import cookieParser from 'cookie-parser'
import { verify } from 'jsonwebtoken'
import { User } from './entity/User'
import { createAccessToken, createRefreshToken } from './auth'
import cors from 'cors'
;(async () => {
  const app = express()
  await createConnection()
  app.use(cookieParser())
  app.use(cors())
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, DataResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  })
  apolloServer.applyMiddleware({ app })
  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello')
  })
  app.post('/refresh_token', async (req: Request, res: Response) => {
    const token = req.cookies.jid
    if (!token) {
      return res.send({ ok: false, accessToken: '' })
    }
    let payload: any = null
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
    } catch (error) {
      console.log(error)
      return res.send({ ok: false, accessToken: '' })
    }
    const user = await User.findOne({ id: payload.userId })

    if (!user) {
      return res.send({ ok: false, accessToken: '' })
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' })
    }
    res.cookie('jid', createRefreshToken(user), { httpOnly: true })
    return res.send({ ok: true, accessToken: createAccessToken(user) })
  })
  app.listen(4000, () => {
    console.log('server is ready at http://localhost:4000')
  })
})()
