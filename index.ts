import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import "./src/inits/mongoose";
import authRoutes from "./src/routes/auth";
import jwt from "jsonwebtoken";
const app = express();
app.use(bodyParser.json());

const whitelist = ["/auth/register", "/auth/login"];

const middleware = (req: Request, res: Response, next: NextFunction) => {
  if (whitelist.includes(req.path)) {
    next();
  } else {
    const authorization = req.headers.authorization;
    if (authorization === undefined) {
      return res.status(401).json({
        code: "missing_token",
        message: "Missing token",
      });
    }
    const token = authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        code: "missing_token",
        message: "Missing token",
      });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({
        code: "internal_server_error",
        message: "Internal server error",
      });
    }
    jwt.verify(token, secret, (err: unknown) => {
      if (err) {
        console.log(err);

        return res.status(401).json({
          code: "invalid_token",
          message: "Invalid token",
        });
      }
      next();
    });
  }
};

app.use(middleware);

app.use("/auth", authRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
