import { loginUser, registerUser } from "../services/user/user.service";
import { RegisterBody } from "./controllers";

import { Request, Response } from "express";

import jwt from "jsonwebtoken";
require("dotenv").config();

export const token = (req: Request, res: Response) => {
  const { id } = req.params;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({
      code: "internal_server_error",
      message: "Internal server error",
    });
  }
  const token = jwt.sign({ id }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });

  res.status(200).json({
    token: token,
  });
};

export const login = (req: Request, res: Response) => {
  const { email, password }: RegisterBody = req.body;

  if (!email) {
    return res.status(400).json({
      code: "missing_email",
      message: "Missing email",
    });
  }

  if (!password) {
    return res.status(400).json({
      code: "missing_password",
      message: "Missing password",
    });
  }

  loginUser({ email, password })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          code: "user_not_found_or_password_incorrect",
          message: "User not found or password incorrect",
        });
      }
      //return user data and generate jwt token
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res.status(500).json({
          code: "internal_server_error",
          message: "Internal server error",
        });
      }
      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400, // expires in 24 hours
      });

      res.status(200).json({
        ...user,
        token: token,
      });
    })
    .catch(() => {
      res.status(500).json({
        code: "internal_server_error",
        message: "Internal server error",
      });
    });
};

export const register = (req: Request, res: Response) => {
  const { nickname, email, password, avatar }: RegisterBody = req.body;

  if (!nickname || !email || !password || !avatar) {
    return res.status(400).json({
      code: "missing_fields",
      message: "Missing fields",
    });
  }

  registerUser({ nickname, email, password, avatar })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({
          code: "user_already_exists",
          message: "User already exists",
        });
      }
    });
};
