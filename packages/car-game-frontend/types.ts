import { RapierRigidBody } from "@react-three/rapier";
import React from "react";
import { Event } from "three";

export type ObjectRef = React.MutableRefObject<THREE.Object3D<Event> | null>;
export type RigidBodyRef = React.MutableRefObject<RapierRigidBody | null>;
