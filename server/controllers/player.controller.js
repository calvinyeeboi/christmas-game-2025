import CONSTANTS from "../constants.js";

export default class PlayerController {
  players = {
    1: {
        name: 'Calvin',
        inventory: {},
    },
    2: {
        name: 'Helen',
        inventory: {},
    },
  };

  getPlayersAsArray() {
    let returnArr = [];
    for (const key in this.players) {
      returnArr.push({
        id: key,
        ...this.players[key],
      })
    }
    return returnArr;
  }

  getResponse(request) {
    const splitRoute = request.route.split('/');
    const method = splitRoute[1];
    switch (method) {
      case CONSTANTS.API_ROUTES.PLAYER.GET_PLAYERS:
        request.data.players = this.getPlayersAsArray();
        break;
    }
    return request;
  }

  handleMsg() {

  }
}