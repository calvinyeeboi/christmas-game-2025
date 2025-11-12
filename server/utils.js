import CONSTANTS from './constants.js';

export const clone = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (err) {
    console.error(`Failed to clone: ${err}`);
  }
};

export const getActions = (key) => {
  let actions = [];
  if (CONSTANTS.ACTIONS[key]) {
    for (const actionKey in CONSTANTS.ACTIONS[key]) {
      const action = CONSTANTS.ACTIONS[key][actionKey];
      if (typeof action !== 'string') {
        actions.push({
          key: action.KEY,
          label: action.LABEL,
        });
      }
    }
  }
  return actions;
};