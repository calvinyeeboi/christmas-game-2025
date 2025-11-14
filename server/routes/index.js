import { Router } from "express";
import player from './player.js';
import room from './room.js';
import admin from './admin.js';
import game from './game.js';

export default () => {
  const app = Router();
  player(app);
  room(app);
  admin(app);
  game(app);
  return app;
};