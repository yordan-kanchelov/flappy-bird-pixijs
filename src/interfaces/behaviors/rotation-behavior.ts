import { IGameObject } from "../game-object";

export interface IRotationBehavior {
    gameObject: IGameObject;
    rotationTicker: PIXI.ticker.Ticker;
    rotate(): void;
    dispose(): void;
}
