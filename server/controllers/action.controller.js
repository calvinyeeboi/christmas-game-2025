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
      case CONSTANTS.FLOORS.LEVEL_1.ROOMS.DINING_ROOM.ACTIONS.CHECK_TABLE.KEY:
        console.log(CONSTANTS.FLOORS.LEVEL_1.ROOMS.DINING_ROOM.ACTIONS.CHECK_TABLE.KEY);
        break;
      case CONSTANTS.FLOORS.LEVEL_1.ROOMS.DINING_ROOM.ACTIONS.CHECK_PLATE.KEY:
        console.log(CONSTANTS.FLOORS.LEVEL_1.ROOMS.DINING_ROOM.ACTIONS.CHECK_PLATE.KEY);
        break;
      case CONSTANTS.FLOORS.LEVEL_1.ROOMS.DINING_ROOM.ACTIONS.EAT_FOOD.KEY:
        console.log(CONSTANTS.FLOORS.LEVEL_1.ROOMS.DINING_ROOM.ACTIONS.EAT_FOOD.KEY);
        break;
    }
    return request;
  }
}