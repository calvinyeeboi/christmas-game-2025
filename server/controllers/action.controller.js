import CONSTANTS from "../constants.js";

export default class ActionController {
  constructor(globals) {
    this.globals = globals;
  }

  getResponse(request) {
    const splitRoute = request.route.split('/');
    const method = splitRoute[1];
    const playerId = splitRoute[2];
    const res = splitRoute[3];
    switch (method) {
      case CONSTANTS.ACTIONS.DINING_ROOM.CHECK_TABLE.KEY:
        console.log(CONSTANTS.ACTIONS.DINING_ROOM.CHECK_TABLE.KEY);
        break;
      case CONSTANTS.ACTIONS.DINING_ROOM.CHECK_PLATE.KEY:
        console.log(CONSTANTS.ACTIONS.DINING_ROOM.CHECK_PLATE.KEY);
        break;
      case CONSTANTS.ACTIONS.DINING_ROOM.EAT_FOOD.KEY:
        console.log(CONSTANTS.ACTIONS.DINING_ROOM.EAT_FOOD.KEY);
        break;
    }
    return request;
  }
}