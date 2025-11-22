import CONSTANTS from "../constants.js";
import { clone } from "../utils.js";

export default class PlayerController {
  constructor(globals) {
    this.globals = globals;
    this.globals.players = {
      1: {
          id: 1,
          name: 'Calvin',
          inventory: {},
          password: 'test',
      },
      2: {
          id: 2,
          name: 'Helen',
          inventory: {},
          isAdmin: true,
          password: 'test',
      },
    };
  }

  getPlayersAsArray() {
    let returnArr = [];
    let clonedPlayers = clone(this.globals.players);
    for (const key in clonedPlayers) {
      delete clonedPlayers[key]['password'];
      returnArr.push(clonedPlayers[key]);
    }
    return returnArr;
  }

  getPlayerByIdAndPassword(id, password) {
    let clonedPlayers = clone(this.globals.players);
    if (clonedPlayers[id] && clonedPlayers[id].password === password) {
      delete clonedPlayers[id].password;
      return clonedPlayers[id];
    }
    return null;
  }

  getResponse(request) {
    const splitRoute = request.route.split('/');
    const method = splitRoute[1];
    switch (method) {
      case CONSTANTS.API_ROUTES.PLAYERS.GET_PLAYERS:
        request.data.players = this.getPlayersAsArray();
        break;
    }
    return request;
  }

  handleMsg() {

  }
}