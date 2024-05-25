import { useEffect } from "react";
import { WebGLRenderer } from "three";

export function usePointerLockControls(
  gl: WebGLRenderer,
  handleMove: (e: PointerEvent) => void
) {
  useEffect(() => {
    function handleClick() {
      if (document.pointerLockElement !== gl.domElement) {
        gl.domElement.requestPointerLock?.();
      }
    }

    function handleLockChange() {
      if (document.pointerLockElement) {
        gl.domElement.addEventListener("pointermove", handleMove);
      } else {
        gl.domElement.removeEventListener("pointermove", handleMove);
      }
    }

    gl.domElement.addEventListener("click", handleClick);
    document.addEventListener("pointerlockchange", handleLockChange);

    return () => {
      gl.domElement.removeEventListener("click", handleClick);
      gl.domElement.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerlockchange", handleLockChange);
    };
  }, [gl, handleMove]);
}
