import CONSTANTS from "../constants.js";
import { WebSocket } from "ws";

export default class WebsocketController {
  clients = new Set();

  constructor(globals) {
    this.globals = globals;
  }

  initialize() {
    this.globals.wsServer.on('connection', (socket) => {
      this.clients.add(socket);
    
      socket.on('message', (message) => {
        let parsedMsg = null;
        try {
          parsedMsg = JSON.parse(Buffer.from(message).toString('utf8'));
        } catch (e) {
          console.error(e);
        }
        if (parsedMsg) {
          try {
            this.handleMessage(parsedMsg, socket);
          } catch (err) {
            console.error('Error handling WS message: ' + err);
          }
        }
      });
    
      socket.on('close', () => {
        this.clients.delete(socket);
      });
    
      socket.on('error', (error) => {
        console.error(`Socket error: ${error.message}`);
      });
    });
  }

  handleMessage(message, socket) {
    const splitRoute = message.route.split('/');
    const route = splitRoute[0];
    let response = message;
    let dontSendToRequestor = false;
    switch (route) {
      case CONSTANTS.API_ROUTES.ADMIN.ROUTE:
        break;
      case CONSTANTS.API_ROUTES.PLAYERS.ROUTE:
        response = this.globals.playerController.getResponse(response);
        break;
      case CONSTANTS.API_ROUTES.ROOMS.ROUTE:
        response = this.globals.roomController.getResponse(response);
        break;
      case CONSTANTS.API_ROUTES.ACTIONS.ROUTE:
        response = this.globals.actionController.getResponse(response);
        break;
    }
    this.sendToClients(response, socket, dontSendToRequestor);
  }

  formatResponse({ route = '', data = {}}) {
    return {
      route,
      data,
    };
  }

  sendToClients(response, socket, dontSendToRequestor) {
    this.clients.forEach((client) => {
      if (dontSendToRequestor && client === socket) {
        return;
      }
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(response));
      }
    });
  }
}