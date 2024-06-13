export function createOnceFunction<T extends any[]>(
  callback: (...args: T) => void
) {
  let hasBeenCalled = false;

  return function (...args: T) {
    if (!hasBeenCalled) {
      callback(...args);
      hasBeenCalled = true;
    }
  };
}
