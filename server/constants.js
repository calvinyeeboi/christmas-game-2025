const CONSTANTS = {
  API_ROUTES: {
    ADMIN: {
      ROUTE: 'admin',
      TOAST: 'toast',
      START_GAME: 'startGame',
    },
    PLAYERS: {
      ROUTE: 'players',
      LOGIN: 'login',
      ROOM: 'room',
      GET_PLAYERS: 'getPlayers',
    },
    ROOMS: {
      ROUTE: 'rooms',
      GET_ROOMS: 'getRooms',
      GET_ROOM: 'getRoom',
    },
    ACTIONS: {
      ROUTE: 'actions',
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
  },
  ENV: {
    APP: {
      PORT: 3000,
    },
    WS: {
      PORT: 8081,
    },
  }
};
export default CONSTANTS;