import { Router } from "express";
import globals from "../globals.js";
const route = Router();

export default (app) => {
  app.use('/players', route);

  route.get('', (req, res) => {
    return res.json({ players: globals.players });
  });
};