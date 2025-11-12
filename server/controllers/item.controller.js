import CONSTANTS from "../constants.js";

export default class ItemController {
  constructor(globals) {
    this.globals = globals;
    this.globals.items = {
      1: {
          id: 1,
          name: CONSTANTS.ITEMS.BLUE_CHARM.NAME,
          playerId: 1,
      },
      2: {
          id: 2,
          name: CONSTANTS.ITEMS.RED_CHARM.NAME,
          playerId: null,
      },
    };
  }

  getResponse(request) {
    const splitRoute = request.route.split('/');
    const method = splitRoute[1];
    switch (method) {
      case CONSTANTS.API_ROUTES.PLAYER.GET_PLAYERS:
        break;
    }
    return request;
  }
}