import { GroundModel } from "../GroundModel";
import { BarrierModel } from "../entities/barrier/model";
import { BurntCarModel1 } from "../entities/burnt/models/BurntCar1";
import { BurntCarModel2 } from "../entities/burnt/models/BurntCar2";
import { BurntCarModel3 } from "../entities/burnt/models/BurntCar3";
import { ShopModel } from "../entities/shop/ShopModel";
import { SignModel } from "../entities/signs/model/Sign";
import { TreeModel } from "../entities/tree/TreeModel";
import { ZombieModel } from "../entities/zombie/model";
import { CarModel } from "../player/model";
import { DriverModel } from "../player/model/Driver";

export const ModelsSample = () => {
  return (
    <>
      <CarModel ref={null} />
      <DriverModel carDrivingState={"STOP"} />
      <SignModel />
      <TreeModel />
      <ShopModel state={"DOOR OPEN"} />
      <GroundModel />
      {/* <ZombieModel state={"Running"} /> */}
      <BurntCarModel1 />
      <BurntCarModel2 />
      <BurntCarModel3 />
      <BarrierModel />
    </>
  );
};
