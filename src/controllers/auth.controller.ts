import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { RequestWithUser } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import { AuthService } from "@services/auth.service";
import { UserService } from "@services/users.service";
import { HttpException } from "@/exceptions/httpException";
import { getCurrentDateTime, isDatePast } from "@utils/utils";
import moment from "moment";
import { sendWelcomEmail } from "../utils/mailer";
import axios from 'axios';

export class AuthController {
  public auth = Container.get(AuthService);
  public userService = Container.get(UserService);
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const signUpUserData: User = await this.auth.signup(userData);

      res.status(201).json({ data: signUpUserData, message: "signup" });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const { tokenData, findUser } = await this.auth.login(userData);

      res
        .status(200)
        .json({ data: findUser, token: tokenData, message: "login" });
    } catch (error) {
      next(error);
    }
  };
  public verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { findUser, tokenData } = await this.auth.verifyuserToken(
        req.params.id
      );

      // if (findUser.isVerified)
      //   throw new HttpException(409, "email Already Verified");
      const payload = await this.userService.updateUser(findUser._id, {
        isVerified: true,
      });
      if (!payload) throw "verification Data NotUpdated";

      sendWelcomEmail(findUser.email, findUser.name);
      res
        .status(200)
        .json({ data: payload, token: tokenData, message: "user verified" });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res.status(200).json({ data: logOutUserData, message: "logout" });
    } catch (error) {
      next(error);
    }
  };

  public socialLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payload = req.body;
      const { tokenData, user } = await this.auth.socialLogin(payload);
      res.status(200).json({ data: user, token: tokenData, message: "login" });
    } catch (err) {
      next(err);
    }
  };
  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payload = req.body;
      const findUser = await this.auth.forgotPassword(payload);
      res.status(200).json({ message: "Forgot password mail sent" });
    } catch (err) {
      next(err);
    }
  };
  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payload = req.body;
      const userToken = req.params.id;
      const { findUser, tokenData } = await this.auth.verifyuserToken(
        userToken
      );
      var ONE_HOUR = 60 * 60 * 1000;
      if (Date.now() - findUser.verifyTokenExpiry > ONE_HOUR) {
        throw new HttpException(409, "verification link Expired");
      }
      const updateUser = await this.auth.resetPassword(userToken, payload);
      res.status(200).json({ message: "password updated" });
    } catch (err) {
      next(err);
    }
  };

  public exchangeGoogleCodeForTokens = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const authorizationCode = req.body.authorizationCode;
      const tokenEndpoint = 'https://oauth2.googleapis.com/token';

      // Parameters required to exchange the authorization code
      const clientId = '609135067470-5jfj85nacrbgotpk1qh4h83fu1qv16fs.apps.googleusercontent.com';
      const clientSecret = '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';
      const redirectUri = 'http://localhost:3000'; // Should match the redirect URI specified in your Google API credentials

      const response = await axios.post(tokenEndpoint, {
        code: authorizationCode,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      });
      console.log("---response --- ",response)
  
      const { access_token, refresh_token } = response.data;


      res.status(200).json({ message: "password updated" });
    } catch (err) {
      console.log("any error -->> ",err)
      next(err);
    }
  };
}
