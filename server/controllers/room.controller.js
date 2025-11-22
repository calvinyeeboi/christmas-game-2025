import CONSTANTS from "../constants.js";
import { clone, getActions } from "../utils.js";

export default class RoomController {
  constructor(globals) {
    this.globals = globals;
    this.globals.house = {
      [CONSTANTS.FLOORS.LEVEL_1.KEY]: {
        name: CONSTANTS.FLOORS.LEVEL_1.NAME,
        rooms: {
          [CONSTANTS.FLOORS.LEVEL_1.ROOMS.DINING_ROOM.KEY]: {
            id: 1,
            name: CONSTANTS.FLOORS.LEVEL_1.ROOMS.DINING_ROOM.NAME,
            players: [1],
            items: [1],
            actions: getActions(CONSTANTS.FLOORS.LEVEL_1.ROOMS.DINING_ROOM.ACTIONS),
            limit: 1,
          },
          [CONSTANTS.FLOORS.LEVEL_1.ROOMS.BATHROOM.KEY]: {
            id: 2,
            name: CONSTANTS.FLOORS.LEVEL_1.ROOMS.BATHROOM.NAME,
            players: [2],
            items: [2],
            limit: 1,
          },
          [CONSTANTS.FLOORS.LEVEL_1.ROOMS.FOYER.KEY]: {
            id: 3,
            name: CONSTANTS.FLOORS.LEVEL_1.ROOMS.FOYER.NAME,
            players: [],
            items: [],
            limit: 1,
          },
        }
      },
      [CONSTANTS.FLOORS.LEVEL_2.KEY]: {
        name: CONSTANTS.FLOORS.LEVEL_2.NAME,
        rooms: {
          [CONSTANTS.FLOORS.LEVEL_2.ROOMS.MASTER_BEDROOM.KEY]: {
            id: 4,
            name: CONSTANTS.FLOORS.LEVEL_2.ROOMS.MASTER_BEDROOM.NAME,
            players: [],
            items: [],
            limit: 1,
          },
          [CONSTANTS.FLOORS.LEVEL_2.ROOMS.GUEST_BEDROOM.KEY]: {
            id: 5,
            name: CONSTANTS.FLOORS.LEVEL_2.ROOMS.GUEST_BEDROOM.NAME,
            players: [],
            items: [],
            limit: 1,
          },
          [CONSTANTS.FLOORS.LEVEL_2.ROOMS.CHILDRENS_BEDROOM.KEY]: {
            id: 6,
            name: CONSTANTS.FLOORS.LEVEL_2.ROOMS.CHILDRENS_BEDROOM.NAME,
            players: [],
            items: [],
            limit: 1,
          },
          [CONSTANTS.FLOORS.LEVEL_2.ROOMS.CHILDRENS_WASHROOM.KEY]: {
            id: 7,
            name: CONSTANTS.FLOORS.LEVEL_2.ROOMS.CHILDRENS_WASHROOM.NAME,
            players: [],
            items: [],
            limit: 1,
          },
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
        delete item.player.password;
      }
      room.items[j] = item;
    }
  }

  getHouse() {
    let clonedHouse = clone(this.globals.house);
    for (let levelKey in clonedHouse) {
      const level = clonedHouse[levelKey];
      for (let roomKey in level.rooms) {
        const room = level.rooms[roomKey];
        this.replaceItemsAndPlayers(room);
      }
    }
    return clonedHouse;
  }

  getRoom(id) {
    let clonedHouse = clone(this.globals.house);
    let foundRoom = null;
    for (let levelKey in clonedHouse) {
      const level = clonedHouse[levelKey];
      for (let roomKey in level.rooms) {
        const room = level.rooms[roomKey];
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
        request.data.rooms = this.getHouse();
        request.data.players = this.globals.players;
        break;
      case CONSTANTS.API_ROUTES.ROOMS.GET_ROOM:
        request.data.room = this.getRoom(id);
        break;
    }
    return request;
  }
}