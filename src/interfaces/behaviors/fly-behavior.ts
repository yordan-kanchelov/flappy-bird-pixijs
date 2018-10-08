import { GameObject } from "../game-object";

export interface IFlyBehavior {
    gameObject: GameObject;

    fly(): void;
    dispose(): void;
}
