export const clone = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (err) {
    console.error(`Failed to clone: ${err}`);
  }
};