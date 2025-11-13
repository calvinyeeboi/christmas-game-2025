import { WebSocketServer } from 'ws';
import express from 'express';
import cors from 'cors';

import CONSTANTS from './constants.js';
import PlayerController from './controllers/player.controller.js';
import RoomController from './controllers/room.controller.js';
import ItemController from './controllers/item.controller.js';
import ActionController from './controllers/action.controller.js';
import WebsocketController from './controllers/websocket.controller.js';
import routes from './routes/index.js';
import globals from './globals.js';

const playerController = new PlayerController(globals);
const roomController = new RoomController(globals);
const itemController = new ItemController(globals);
const actionController = new ActionController(globals);
const websocketController = new WebsocketController(globals);

globals.playerController = playerController;
globals.roomController = roomController;
globals.itemController = itemController;
globals.actionController = actionController;
globals.websocketController = websocketController;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', routes());
app.listen(CONSTANTS.ENV.APP.PORT, (err) => {
  if (!err) {
    console.log('App server running on Port: ' + CONSTANTS.ENV.APP.PORT);
  } else {
    console.error('Could not start App server: ' + err);
  }
});
const wsServer = new WebSocketServer({ 
  port: CONSTANTS.ENV.WS.PORT, 
});
globals.wsServer = wsServer;
globals.websocketController.initialize();
console.log('WS server running on Port: ' + CONSTANTS.ENV.WS.PORT);