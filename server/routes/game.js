import { Router } from "express";
import globals from "../globals.js";
import CONSTANTS from "../constants.js";
const route = Router();

export default (app) => {
  app.use(`/${CONSTANTS.API_ROUTES.GAME.ROUTE}`, route);

  route.get(`/${CONSTANTS.API_ROUTES.GAME.STATUS}`, (req, res) => {
    return res.json({ 
      status: {
        started: globals.game.started,
      }
    });
  });
};