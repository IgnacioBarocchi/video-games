export const LobbyTurnTable = () => {
  const playerObjectReferences = useRef({
    rigidbody: useRef<RapierRigidBody>(null),
    modelRef: useRef<Object3D>(null),
  });

  useFrame((_, delta) => {
    if (!playerObjectReferences.current) return;

    const rotationSpeed = 0.05;
    if (playerObjectReferences.current.modelRef.current) {
      const { rotation } = playerObjectReferences.current.modelRef.current;
      rotation.y += rotationSpeed * delta;
    }
  });

  return <CarModel ref={playerObjectReferences} />;
};

export const MainMenu = ({
  onStartClick,
  onQuitClick,
  onAboutClick,
  lobbyMusic,
}) => {
  const [shouldFade, setShouldFade] = useState(false);
  useEffect(() => {
    const audio = new Audio(lobbyMusic);
    audio.play();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [lobbyMusic]);

  const handleStart = () => {
    setShouldFade(true);
    setTimeout(() => onStartClick(), 1500);
  };

  return (
    <Panel clickable fadeIn={shouldFade}>
      <Panel
        top={panelPadding}
        left="50%"
        cssText="transform: translateX(-50%)"
        width="fit-content"
        padBox={false}
      >
        <Title>LA LUZ DEL TÚNEL</Title>
      </Panel>
      <Panel top="80%" clickable>
        <Box
          visible={true}
          direction="horizontal"
          fullWidth
          justification="space-evenly"
          clickable={true}
        >
          <Button detailed={true} onClick={onQuitClick}>
            Salir
          </Button>
          <Button detailed={true} onClick={handleStart}>
            Empezar
          </Button>
          <Button detailed={true} onClick={onAboutClick}>
            Créditos
          </Button>
        </Box>
      </Panel>
    </Panel>
  );
};
