import * as PIXI from "pixi.js";

import { IGameObject } from "../game-object";

export interface IRotationBehavior {
    gameObject: IGameObject;
    rotationTicker: PIXI.Ticker;
    rotate(): void;
    dispose(): void;
}
