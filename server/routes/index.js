import { Router } from "express";
import player from './player.js';
import room from './room.js';

export default () => {
  const app = Router();
  player(app);
  room(app);
  return app;
};