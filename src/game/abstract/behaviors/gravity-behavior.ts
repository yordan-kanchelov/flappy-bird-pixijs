import * as PIXI from "pixi.js";

import { GameObject } from "../game-object";

export interface GravityBehavior {
    gameObject: GameObject;
    gravityTicker: PIXI.Ticker;
    gravity(): void;
    dispose(): void;
}
