import { IGameObject } from "../../interfaces/game-object";
import { IGravityBehavior } from "../../interfaces/behaviors/gravity-behavior";

export class NoGravityBehavior implements IGravityBehavior {
    public gameObject: IGameObject;
    public gravityPower: number = 0.1;
    public gravityTicker: PIXI.ticker.Ticker;

    constructor(gameObject: IGameObject, velocityY = 0) {}

    public gravity(): void {
        // DO NOTHING
    }

    public dispose(): void {}
}
