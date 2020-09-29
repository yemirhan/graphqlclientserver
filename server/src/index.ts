import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import { createConnection } from 'typeorm';

(async () => {
  const app = express();
  await createConnection();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app });
  app.get('/', (_req: express.Request, res: express.Response) => {
    res.send('Hello');
  });
  app.listen(4000, () => {
    console.log('server is ready at http://localhost:4000');
  });
})();
