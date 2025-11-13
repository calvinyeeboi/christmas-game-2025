import { Router } from "express";
import globals from "../globals.js";
import CONSTANTS from "../constants.js";
const route = Router();

export default (app) => {
  app.use(`/${CONSTANTS.API_ROUTES.ROOMS.ROUTE}`, route);

  route.get('', (req, res) => {
    return res.json({ rooms: globals.roomController.getRooms() });
  });

  route.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    return res.json({ room: globals.roomController.getRoom(id) });
  });
};