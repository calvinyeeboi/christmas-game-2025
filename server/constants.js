const CONSTANTS = {
  API_ROUTES: {
    ADMIN: {
      ROUTE: 'admin',
      TOAST: 'toast',
      START_GAME: 'startGame',
    },
    PLAYER: {
      ROUTE: 'player',
      LOGIN: 'login',
      ROOM: 'room',
      GET_PLAYERS: 'getPlayers',
    },
    ROOM: {
      ROUTE: 'room',
      GET_ROOMS: 'getRooms',
      GET_ROOM: 'getRoom',
    },
    ACTION: {
      ROUTE: 'action',
    }
  },
  ITEMS: {
    BLUE_CHARM: {
      NAME: 'Blue Charm',
    },
    RED_CHARM: {
      NAME: 'Red Charm',
    },
  },
  ACTIONS: {
    DINING_ROOM: {
      KEY: 'DINING_ROOM',
      CHECK_TABLE: {
        KEY: 'checkDiningRoomTable',
        LABEL: 'Check table',
      },
      CHECK_PLATE: {
        KEY: 'checkDiningRoomPlate',
        LABEL: 'Check plate',
      },
      EAT_FOOD: {
        KEY: 'eatDiningRoomFood',
        LABEL: 'Eat that mouldy chicken',
      },
    }
  }
};
export default CONSTANTS;