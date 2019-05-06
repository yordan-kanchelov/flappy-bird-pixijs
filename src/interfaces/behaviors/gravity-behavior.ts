import * as PIXI from "pixi.js";

import { IGameObject } from "../game-object";

export interface IGravityBehavior {
    gameObject: IGameObject;
    gravityPower: number;
    gravityTicker: PIXI.Ticker;
    gravity(): void;
    dispose(): void;
}
