import * as PIXI from "pixi.js";

import { GameObject } from "../../abstract/game-object";
import { GravityBehavior } from "../../abstract/behaviors/gravity-behavior";

export class NoGravityBehavior implements GravityBehavior {
    public gameObject: GameObject;
    public gravityPower: number = 0.1;
    public gravityTicker: PIXI.Ticker;

    constructor(gameObject: GameObject) {}

    public gravity(): void {
        // DO NOTHING
    }

    public dispose(): void {}
}
