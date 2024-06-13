export const throttleFunction = (func: Function, delay: number = 1000) => {
  let prev = 0;
  return (...args) => {
    let now = new Date().getTime();

    if (now - prev > delay) {
      prev = now;

      return func(...args);
    }
  };
};
