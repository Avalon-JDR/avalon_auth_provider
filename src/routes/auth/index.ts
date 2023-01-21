import express from "express";
import { login, register, token } from "../../controllers/auth.controller";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/token/:id", token);

export default router;
