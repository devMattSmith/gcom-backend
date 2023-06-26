import { SECRET_KEY } from "@config";
import { HttpException } from "@exceptions/httpException";
import { DataStoredInToken, TokenData } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import { UserModel } from "@models/users.model";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Service, Token } from "typedi";

import { provider } from "@/enum/enum";
import { isEmail } from "class-validator";
import { generatePassword } from "@/utils/utils";

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = {
    _id: user._id,
    role: user.role,
  };
  const expiresIn: number = 60 * 60 * 24;

  return {
    expiresIn,
    token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }),
  };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async signup(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async login(
    userData: User
  ): Promise<{ tokenData: object; findUser: User }> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (!findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} was not found`
      );

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );
    if (!isPasswordMatching)
      throw new HttpException(409, "Password is not matching");

    const tokenData = await createToken(findUser);
    // const result: User = await UserModel.findByIdAndUpdate(
    //   { _id: findUser._id },
    //   { verification: tokenData },
    //   { new: true }
    // );

    return { tokenData, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (!findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} was not found`
      );

    return findUser;
  }

  public async socialLogin(body: any) {
    let tokenData: TokenData;
    let user: User;
    if (!body.provider) {
      throw new HttpException(400, `Provider Mandatory`);
    }

    switch (body.provider) {
      case "GOOGLE":
        if (body.paylaod?.email && isEmail(body?.payload?.email)) {
          throw new HttpException(400, "Invalid Email");
        }
        user = await UserModel.findOne({ email: body.payload.email });

        if (!user) {
          // create user
          user = await UserModel.create({
            email: body.payload.email,
            isVerified: true,
            firstName: body?.payload?.given_name,
            lastName: body?.payload?.family_name,
            password: generatePassword(),
            name: body?.payload?.name,
            status: true,
            thumbnail: body?.payload?.picture,
          });
        }
        break;
      case "FACEBOOK":
        if (body.paylaod?.email && isEmail(body?.payload?.email)) {
          throw new HttpException(400, "Invalid Email");
        }
        user = await UserModel.findOne({ email: body.payload.email });

        if (!user) {
          // create user
          user = await UserModel.create({
            email: body.payload.email,
            isVerified: true,
            firstName: body?.payload?.given_name,
            lastName: body?.payload?.family_name,
            password: generatePassword(),
            name: body?.payload?.name,
            status: true,
            thumbnail: body?.payload?.picture,
          });
        }
        break;
      default:
        throw new HttpException(400, `Invalid Provider ${body.provider}`);
    }

    tokenData = await createToken(user);

    return { tokenData, user };
  }
}
