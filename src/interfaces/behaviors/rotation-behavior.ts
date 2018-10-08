import { GameObject } from "../game-object";

export interface IRotationBehavior {
    gameObject: GameObject;
    rotationTicker: PIXI.ticker.Ticker;
    rotate(): void;
    dispose(): void;
}
