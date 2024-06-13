import { useState, useEffect } from "react";

const defer = (fn) => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(fn);
  } else {
    setTimeout(fn, 1);
  }
};

export const DeferredComponent = ({ Component, ...props }) => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    defer(() => setIsIdle(true));
  }, []);

  if (!isIdle) return null;
  return <Component {...props} />;
};
