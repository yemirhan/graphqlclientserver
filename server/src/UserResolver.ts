import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
} from "type-graphql";
import { User } from "./entity/User";
import { hash, compare } from "bcryptjs";
import { ExpressContext } from "./ExpressContext";
import { createAccessToken, createRefreshToken } from "./auth";
import { isAuth } from "./isAuth";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";
import { sendRefreshToken } from "./sendRefreshToken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field()
  userid: number;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi!";
  }
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: ExpressContext) {
    console.log(payload);
    return `your user id is ${payload!.userId}`;
  }
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: ExpressContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return { message: "not authorized" };
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return { message: "an error occurred" };
    }
  }
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: ExpressContext) {
    sendRefreshToken(res, "");

    return true;
  }
  @Mutation(() => Boolean)
  async revokeAccessTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);
    return true;
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPass = await hash(password, 12);
    try {
      await User.insert({
        name,
        email,
        password: hashedPass,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: ExpressContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User does not exists");
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("wrong password!");
    }

    //login succesful
    sendRefreshToken(res, createRefreshToken(user));
    return {
      accessToken: createAccessToken(user),
      userid: user.id,
    };
  }
}
