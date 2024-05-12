const machineInput = {
  predictableActionArguments: true,
  context: {
    initialHP: 100,
    currentHP: 100,
    damageTaken: 0,
    rigidBody: null,
    actions: null,
    combatStatus: "roaming",
  },
  id,
  description,
  initial: "Idle",
  states: {
    Idle: getMoveOrIdleChildNodes("Idle"),
    Move: getMoveOrIdleChildNodes("Move"),
    "Use skill 1": getOutboundInteractionsChildNodes("Use skill 1"),
    "Use skill 2": getOutboundInteractionsChildNodes("Use skill 2"),
    "Use skill 3": getOutboundInteractionsChildNodes("Use skill 3"),
    "React to skill 1": getInboundInteractionsChildNodes("React to skill 1"),
    "React to skill 2": getInboundInteractionsChildNodes("React to skill 2"),
    "React to skill 3": getInboundInteractionsChildNodes("React to skill 3"),
    Death: getFinalChildNode(),
  },
};

const config = {
  actions: {
    reactToSkill1: (context: FSMContext) => {
      const audio = new Audio(soundPathByFSMState.get("React To Skill 1")!);
      audio.play();
      stopAll(
        FSMSkills.map(
          (skill) =>
            context.actions![animationNameByFSMState.get(skill as FSMStates)!]
        )
      );
      getSkillOrReactionEntry("React to skill 1")(context);
    },
    reactToSkill2: (context: FSMContext) => {
      const audio = new Audio(soundPathByFSMState.get("React To Skill 2")!);
      audio.play();
      stopAll(
        FSMSkills.map(
          (skill) =>
            context.actions![animationNameByFSMState.get(skill as FSMStates)!]
        )
      );
      getSkillOrReactionEntry("React to skill 2")(context);
    },
    reactToSkill3: (context: FSMContext) => {
      stopAll(
        FSMSkills.map(
          (skill) =>
            context.actions![animationNameByFSMState.get(skill as FSMStates)!]
        )
      );
      getSkillOrReactionEntry("React to skill 3")(context);
    },
    reactToSkill4: (context: FSMContext) => {
      stopAll(
        FSMSkills.map(
          (skill) =>
            context.actions![animationNameByFSMState.get(skill as FSMStates)!]
        )
      );
      getSkillOrReactionEntry("React to skill 4")(context);
    },
  },
};
