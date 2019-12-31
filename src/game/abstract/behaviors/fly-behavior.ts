import { GameObject } from "../game-object";

export interface FlyBehavior {
    gameObject: GameObject;

    fly(): void;
    dispose(): void;
}
