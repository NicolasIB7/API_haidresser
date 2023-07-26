import { Router, Request, Response } from "express";
import { register, login } from "../controllers/auth.controller";
import { validatorRegister, validatorLogin } from "../middlewares/validators";
import { validatorResultError } from "../middlewares/validatorResultError";

const router = Router();

router.post(
  "/register",
  validatorRegister,
  validatorResultError,
  async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const createRegister = await register(data);

      res
        .status(200)
        .json({ message: "Client registered succesfully", createRegister });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.post(
  "/login",
  validatorLogin,
  validatorResultError,
  async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const clientLogin = await login(data);

      res
        .status(200)
        .json({ message: "Client login succesfully", clientLogin });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
