import * as PIXI from "pixi.js";

import { IGameObject } from "../game-object";

export interface IGravityBehavior {
    gameObject: IGameObject;
    gravityTicker: PIXI.Ticker;
    gravity(): void;
    dispose(): void;
}
