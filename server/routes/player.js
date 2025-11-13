import { Router } from "express";
import globals from "../globals.js";
import CONSTANTS from "../constants.js";
const route = Router();

export default (app) => {
  app.use(`/${CONSTANTS.API_ROUTES.PLAYERS.ROUTE}`, route);

  route.get('', (req, res) => {
    return res.json({ players: globals.playerController.getPlayersAsArray() });
  });
};