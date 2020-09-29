import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from 'type-graphql';
import { User } from './entity/User';
import { hash, compare } from 'bcryptjs';
import { ExpressContext } from './ExpressContext';
import { createAccessToken, createRefreshToken } from './auth';
import { isAuth } from './isAuth';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi!';
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
  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPass = await hash(password, 12);
    try {
      await User.insert({
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
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: ExpressContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User does not exists');
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error('wrong password!');
    }
    //login succesful
    res.cookie('jid', createRefreshToken(user), { httpOnly: true });
    return {
      accessToken: createAccessToken(user),
    };
  }
}
