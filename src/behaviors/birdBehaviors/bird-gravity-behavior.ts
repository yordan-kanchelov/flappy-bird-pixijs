import { IGameObject } from "../../interfaces/game-object";
import { GravityBehavior } from "../gravityBehaviors/gravity-behavior";

export class BirdGravityBehavior extends GravityBehavior {
    public gravityPower: number = 0.1;

    constructor(bird: IGameObject, velocityY = 0) {
        super(bird, velocityY)
    }
}
