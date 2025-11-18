const CONSTANTS = {
  API_ROUTES: {
    GAME: {
      ROUTE: 'game',
      STATUS: 'status',
      START: 'start',
    },
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
    },
  },
  ITEMS: {
    BLUE_CHARM: {
      NAME: 'Blue Charm',
    },
    RED_CHARM: {
      NAME: 'Red Charm',
    },
  },
  FLOORS: {
    LEVEL_1: {
      KEY: 'LEVEL_1',
      NAME: 'Main Floor',
      ROOMS: {
        DINING_ROOM: {
          KEY: 'dining_room_1',
          NAME: 'Dining Room',
          ACTIONS: {
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
        BATHROOM: {
          KEY: 'bathroom_1',
          NAME: 'Bathroom',
        },
        FOYER: {
          KEY: 'foyer_1',
          NAME: 'Foyer',
        },
      }
    },
    LEVEL_2: {
      KEY: 'LEVEL_2',
      NAME: 'Upstairs',
      ROOMS: {
        MASTER_BEDROOM: {
          KEY: 'master_bedroom_2',
          NAME: 'Dining Room',
        },
        GUEST_BEDROOM: {
          KEY: 'guest_bedroom_2',
          NAME: 'Guest Bedroom',
        },
        CHILDRENS_BEDROOM: {
          KEY: 'childrens_bedroom_2',
          NAME: 'Children\'s Bedroom',
        },
        CHILDRENS_WASHROOM: {
          KEY: 'childrens_washroom_2',
          NAME: 'Children\'s Bathroom',
        },
      },
    },
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