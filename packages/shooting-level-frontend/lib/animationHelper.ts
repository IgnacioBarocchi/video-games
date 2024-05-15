import { AnimationAction, LoopOnce } from "three";
import {
  DEATH_STATE,
  FSMContext,
  FSMStates,
  IDLE_STATE,
  MOVE_STATE,
} from "../machines/createBaseFSMInput";

export const blendAnimationTransition = (action: AnimationAction | null) => {
  if (!action) return;
  action.clampWhenFinished = true;
  action.reset()?.fadeIn(0.2)?.play();
};

export const playOneShotAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  // action.clampWhenF
  // inished = true;
  action?.reset()?.play();
};

export const easeOutAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  // action.clampWhenFinished = true;
  action?.fadeOut(0.2);
};

export const stopAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  action.clampWhenFinished = true;
  action.fadeOut(0.2);
  action?.stop();
};

export const stopAll = (actions: AnimationAction[] | null) => {
  if (!actions) return;

  for (const action of actions) {
    action.fadeOut(0.2).stop();
  }
};

export const playFinalAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  action.clampWhenFinished = true;
  action.setLoop(LoopOnce, 1);
  action.enabled = true;
  action.reset().play();
};

export const getFSMOneShotPlayerFrom = (state: FSMStates) => {
  return {
    with: (context: FSMContext) => {
      if (state === DEATH_STATE) {
        throw new Error("use play final animation");
        // don't play audios here
      }

      if (context.actions) {
        // context.actions[
        //   context.animationNameByFSMState.get(IDLE_STATE)!
        // ]?.stop();
        // context.actions[
        //   context.animationNameByFSMState.get(MOVE_STATE)!
        // ]?.stop();

        const action =
          context.actions[context.animationNameByFSMState.get(state)!] ??
          context.actions[context.animationNameByFSMState.get(IDLE_STATE)!];

        easeOutAnimation(
          context.actions[context.animationNameByFSMState.get(IDLE_STATE)!]
        );
        easeOutAnimation(
          context.actions[context.animationNameByFSMState.get(MOVE_STATE)!]
        );
        playOneShotAnimation(action);

        setTimeout(() => {
          action?.fadeOut(1).stop();
          context.actions[context.animationNameByFSMState.get(IDLE_STATE)!]
            .fadeIn(0.5)
            .reset()
            .play();
          // easeOutAnimation(action);
          // context.actions[context.animationNameByFSMState.get(IDLE_STATE)!]
          //   ?.fadeIn(0.2)
          //   .play();
        }, context.characterFSMDurations.get(state));
      }
    },
  };
};
