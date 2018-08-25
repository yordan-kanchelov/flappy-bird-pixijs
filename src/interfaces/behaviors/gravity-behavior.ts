import { GameObject } from "../game-object";

export interface IGravityBehavior {
    gameObject: GameObject;
    velocityY: number;
    gravityPower: number;
    gravityTicker: PIXI.ticker.Ticker;
    gravity(): void;
    dispose(): void;
}
