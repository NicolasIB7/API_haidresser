import { Router, Request, Response } from "express";
import db from "../db";
import { requireToken } from "../middlewares/requireToken";

const router = Router();

router.get("/", requireToken, async (req: Request, res: Response) => {
  try {
    const clients = await db.Client.findAll();
    res.status(200).json(clients);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/client", requireToken, async (req: Request, res: Response) => {
  try {
    const clients = await db.Client.findByPk((req as any).uid);
    res.status(200).json(clients);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


