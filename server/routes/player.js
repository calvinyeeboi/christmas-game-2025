import { Router } from "express";
import globals from "../globals.js";
import CONSTANTS from "../constants.js";
const route = Router();

export default (app) => {
  app.use(`/${CONSTANTS.API_ROUTES.PLAYERS.ROUTE}`, route);

  route.get('', (req, res) => {
    return res.json({ players: globals.playerController.getPlayersAsArray() });
  });

  route.post(`/${CONSTANTS.API_ROUTES.PLAYERS.LOGIN}`, (req, res) => {
    const { id, password } = req.body;
    return res.json({ player: globals.playerController.getPlayerByIdAndPassword(id, password) });
  });
};