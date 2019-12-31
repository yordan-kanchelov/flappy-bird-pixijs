import * as PIXI from "pixi.js";

import { GameObject } from "../abstract/game-object";

export class Pipe extends PIXI.Sprite implements GameObject {
    gravityPower: number;
    health: number;
    velocityX: number;
    velocityY: number;

    constructor(upperPipe: boolean = true) {
        super(PIXI.Texture.from(upperPipe ? "pipeUp.png" : "pipeDown.png"));
    }

    get body(): PIXI.Sprite {
        return this;
    }
}
