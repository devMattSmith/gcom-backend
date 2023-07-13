import { SECRET_KEY } from "@config";
import { HttpException } from "@exceptions/httpException";
import { DataStoredInToken, TokenData } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import { UserModel } from "@models/users.model";
import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import Container, { Service } from "typedi";
import crypto from "crypto";
import { generatePassword } from "@/utils/utils";
import { isEmail } from "class-validator";
import { UserActivityService } from "./userActivity.service";
import { LoginActivity } from "./loginActivity.service";
import { CourseActivityEnum } from "@/enum/enum";
import {
  sendForgotPasswordEmail,
  sendVerifyingUserEmail,
} from "../utils/mailer";
import { Types } from "mongoose";

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
  public userActivity = Container.get(UserActivityService);
  public loginActivity = Container.get(LoginActivity);

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
    const token = crypto.randomBytes(32).toString("hex");
    const link = `${"http://localhost:3000"}/verify-email/${token}`;
    await UserModel.findByIdAndUpdate(
      createUserData._id,
      {
        verifyTokenExpiry: Date.now(),
        verifyToken: token,
      },
      { new: true }
    );
    sendVerifyingUserEmail(createUserData.email, createUserData.name, link);
    // const tokenData = await createToken(createUserData);

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

    if (!findUser.isVerified)
      throw new HttpException(409, `your account not verified`);
    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );
    if (!isPasswordMatching)
      throw new HttpException(409, "Password is not matching");

    const tokenData = await createToken(findUser);

    await this.loginActivity.create({
      device_id: userData?.deviceInfo?.device_id,
      device_name: userData?.deviceInfo?.device_name,
      city: userData?.deviceInfo?.city,
      country: userData?.deviceInfo?.country,
      user: findUser._id,
      type: "LOGIN",
    });

    await this.userActivity.create({
      type: CourseActivityEnum.LOGIN,
      user: findUser._id,
    });

    return { tokenData, findUser };
  }

  public async forgotPassword(userData: any): Promise<any> {
    console.log(userData, "-------");
    const findUser: User = await UserModel.findOne(userData);
    if (!findUser) throw new HttpException(409, "email doesn't exist");
    const tokenData = await createToken(findUser);
    const token = crypto.randomBytes(32).toString("hex");
    await UserModel.findByIdAndUpdate(
      findUser._id,
      {
        verifyTokenExpiry: Date.now(),
        verifyToken: token,
      },
      { new: true }
    );
    const link = `${"http://localhost:3000"}/reset-password/${token}`;
    sendForgotPasswordEmail(findUser.email, findUser.name, link);
    return findUser;
  }

  public async verifyuserToken(verifyToken: string): Promise<any> {
    const findUser: User = await UserModel.findOne({
      verifyToken,
    });
    if (!findUser) throw new HttpException(409, `This token was not valid`);
    const tokenData = await createToken(findUser);
    return { findUser, tokenData };
  }

  public async resetPassword(verifyToken: string, payload: any): Promise<any> {
    const findUser: User = await UserModel.findOne({
      verifyToken,
    });
    if (!findUser) throw new HttpException(409, `This token was not valid`);
    const hashedPassword = await hash(payload.newPassword, 10);
    const updateUserById: User = await UserModel.findByIdAndUpdate(
      { _id: findUser._id },
      {
        password: hashedPassword,
      },
      { new: true }
    );
    if (!updateUserById)
      throw new HttpException(409, "Password is not updated");
    const tokenData = await createToken(findUser);
    return { updateUserById, tokenData };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({
      email: userData.email,
      password: userData.password,
    });

    if (userData?.deviceInfo) {
      await this.loginActivity.create({
        device_id: userData?.deviceInfo?.device_id,
        device_name: userData?.deviceInfo?.device_name,
        city: userData?.deviceInfo?.city,
        country: userData?.deviceInfo?.country,
        user: findUser._id,
        type: "LOGOUT",
      });
    }
    await this.userActivity.create({
      type: CourseActivityEnum.LOGOUT,
      user: findUser._id,
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

    if (body?.deviceInfo) {
      await this.loginActivity.create({
        device_id: body?.deviceInfo?.device_id,
        device_name: body?.deviceInfo?.device_name,
        city: body?.deviceInfo?.city,
        country: body?.deviceInfo?.country,
        user: user._id,
        type: "LOGIN",
      });
    }
    await this.userActivity.create({
      type: CourseActivityEnum.LOGIN,
      user: user._id,
    });

    tokenData = await createToken(user);

    return { tokenData, user };
  }
}
