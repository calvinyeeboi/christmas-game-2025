import CONSTANTS from './constants.js';

export const clone = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (err) {
    console.error(`Failed to clone: ${err}`);
  }
};

export const getActions = (actions) => {
  let formattedActions = [];
  if (actions) {
    for (const actionKey in actions) {
      const action = actions[actionKey];
      if (typeof action !== 'string') {
        formattedActions.push({
          key: action.KEY,
          label: action.LABEL,
        });
      }
    }
  }
  return formattedActions;
};