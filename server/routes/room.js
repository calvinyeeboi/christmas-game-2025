import { Router } from "express";
import globals from "../globals.js";
const route = Router();

export default (app) => {
  app.use('/rooms', route);

  route.get('', (req, res) => {
    return res.json({ rooms: globals.rooms });
  });

  route.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    return res.json({ room: globals.roomController.getRoom(id) });
  });
};