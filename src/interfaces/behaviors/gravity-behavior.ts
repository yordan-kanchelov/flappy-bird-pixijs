import { IGameObject } from "../game-object";

export interface IGravityBehavior {
    gameObject: IGameObject;
    gravityPower: number;
    gravityTicker: PIXI.ticker.Ticker;
    gravity(): void;
    dispose(): void;
}
