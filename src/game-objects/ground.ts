import * as PIXI from "pixi.js";

import { IGameObject } from "../interfaces/game-object";
export class Ground extends PIXI.Sprite implements IGameObject {
    health: number;
    velocityX: number;
    velocityY: number;
    gravityPower: number;

    constructor() {
        super(PIXI.Texture.from("ground.png"));
    }

    get body(): PIXI.Sprite {
        return this;
    }
}
