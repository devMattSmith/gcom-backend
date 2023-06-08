import { RequestWithUser } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import { AuthService } from "@services/auth.service";
import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
export class AuthController {
  public auth = Container.get(AuthService);

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
      //FIX: unused variables
      const { tokenData, findUser, result } = await this.auth.login(userData);

      res.status(200).json({ data: result, message: "login" });
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

      // COOKIES not used in AUTH, Why Cookies Handle in Logout
      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res.status(200).json({ data: logOutUserData, message: "logout" });
    } catch (error) {
      next(error);
    }
  };
}
