import CONSTANTS from "../constants.js";
import { clone } from "../utils.js";

export default class RoomController {
  constructor(globals) {
    this.globals = globals;
    this.globals.rooms = {
      level_1: {
        dining_room: {
          players: [1, 2],
          items: [1]
        },
        bathroom: {
          players: [1],
          items: [2]
        },
        foyer: {
          players: [],
          items: [],
        },
      },
      level_2: {
        master_bedroom: {
          players: [1],
          items: [1],
        },
        guest_bedroom: {
          players: [2],
          items: [],
        },
        childrens_bedroom: {
          players: [2, 2],
          items: [2],
        },
        childrens_washroom: {
          players: [2, 1],
          items: [],
        },
      }
    };
  }

  getRooms() {
    let clonedRooms = clone(this.globals.rooms);
    for (let levelKey in clonedRooms) {
      const level = clonedRooms[levelKey];
      for (let roomKey in level) {
        const room = level[roomKey];
        for (let i = 0; i < room.players.length; i++) {
          room.players[i] = this.globals.players[room.players[i]];
        }
        for (let j = 0; j < room.items.length; j++) {
          room.items[j] = this.globals.items[room.items[j]];
        }
      }
    }
    return clonedRooms;
  }

  getResponse(request) {
    const splitRoute = request.route.split('/');
    const method = splitRoute[1];
    switch (method) {
      case CONSTANTS.API_ROUTES.ROOM.GET_ROOMS:
        request.data.rooms = this.getRooms();
        request.data.players = this.globals.players;
        break;
    }
    return request;
  }
}