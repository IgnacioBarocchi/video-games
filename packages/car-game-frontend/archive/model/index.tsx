//  const Provider = memo(
//     forwardRef<{}, PlayerObjectReferences>((_ {children}, ref) => {
//       const [carDrivingState, setCarDrivingState] = useState('STOP');
//       const { nodes, materials, animations } = useGLTF(
//         '/../src/assets/models/Car/Car_V2.gltf',
//       ) as GLTFResult;

//       const { actions } = useAnimations<GLTFActions>(
//         animations,
//         ref.current.modelRef,
//       );

//       const animator = useMemo(
//         () =>
//           new Animator({
//             rigidbody: ref.current.rigidbody,
//             actions,
//             setCarDrivingState,
//           }),
//         [ref.current.rigidbody, actions],
//       );

//       useFrame(() => {
//         if (!ref.current?.modelRef?.current || !ref.current?.rigidbody) {
//           return;
//         }
//         animator.watchCarMovement();
//       });

//       useEffect(() => {
//         if (!ref.current?.modelRef?.current || !ref.current?.rigidbody) {
//           return;
//         }

//         if (carDrivingState.includes('LEFT')) {
//           actions.Front_Wheels_Turn_Left?.reset().play();
//         } else {
//           actions.Front_Wheels_Turn_Left?.crossFadeTo(
//             actions.Front_Wheels_Running,
//             1,
//             true,
//           ).stop();
//         }

//         if (carDrivingState.includes('RIGHT')) {
//           actions.Front_Wheels_Turn_Right.timeScale = 0.5;
//           actions.Front_Wheels_Turn_Right.reset().play();
//         } else {
//           actions.Front_Wheels_Turn_Right?.crossFadeTo(
//             actions.Front_Wheels_Running,
//             1,
//             true,
//           ).stop();
//         }

//         if (carDrivingState === 'STOP') {
//           actions.Idle.reset().play();
//         } else {
//           actions.Engine_Running.reset().play();
//           actions.Driving.play();
//           actions.Front_Wheels_Running.play();
//           actions.Back_Wheels_Running.play();
//         }
//       }, [carDrivingState, ref.current.rigidbody]);

//       return (
//         <group ref={ref.current.modelRef} dispose={null} scale={1.2}>
//             {children}
//         <group/>)
//         }))
