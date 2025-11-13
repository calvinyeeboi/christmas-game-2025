import CONSTANTS from "../constants.js";
import { clone, getActions } from "../utils.js";

export default class RoomController {
  constructor(globals) {
    this.globals = globals;
    this.globals.rooms = {
      level_1: {
        dining_room: {
          id: 1,
          name: 'Dining Room',
          players: [1],
          items: [1],
          actions: getActions(CONSTANTS.ACTIONS.DINING_ROOM.KEY),
        },
        bathroom: {
          id: 2,
          players: [2],
          items: [2]
        },
        foyer: {
          id: 3,
          players: [],
          items: [],
        },
      },
      level_2: {
        master_bedroom: {
          id: 4,
          players: [],
          items: [],
        },
        guest_bedroom: {
          id: 5,
          players: [],
          items: [],
        },
        childrens_bedroom: {
          id: 6,
          players: [],
          items: [],
        },
        childrens_washroom: {
          id: 7,
          players: [],
          items: [],
        },
      }
    };
  }

  replaceItemsAndPlayers(room) {
    for (let i = 0; i < room.players.length; i++) {
      room.players[i] = clone(this.globals.players[room.players[i]]);
    }
    for (let j = 0; j < room.items.length; j++) {
      let item = clone(this.globals.items[room.items[j]]);
      if (item.playerId) {
        item.player = clone(this.globals.players[item.playerId]);
      }
      room.items[j] = item;
    }
  }

  getRooms() {
    let clonedRooms = clone(this.globals.rooms);
    for (let levelKey in clonedRooms) {
      const level = clonedRooms[levelKey];
      for (let roomKey in level) {
        const room = level[roomKey];
        this.replaceItemsAndPlayers(room);
      }
    }
    return clonedRooms;
  }

  getRoom(id) {
    let clonedRooms = clone(this.globals.rooms);
    let foundRoom = null;
    for (let levelKey in clonedRooms) {
      const level = clonedRooms[levelKey];
      for (let roomKey in level) {
        const room = level[roomKey];
        this.replaceItemsAndPlayers(room);
        if (room.id === id) {
          foundRoom = room;
        }
      }
    }
    return foundRoom;
  }

  getResponse(request) {
    const splitRoute = request.route.split('/');
    const method = splitRoute[1];
    let id = splitRoute[2];
    if (id) {
      id = parseInt(id);
    }
    switch (method) {
      case CONSTANTS.API_ROUTES.ROOMS.GET_ROOMS:
        request.data.rooms = this.getRooms();
        request.data.players = this.globals.players;
        break;
      case CONSTANTS.API_ROUTES.ROOMS.GET_ROOM:
        request.data.room = this.getRoom(id);
        break;
    }
    return request;
  }
}