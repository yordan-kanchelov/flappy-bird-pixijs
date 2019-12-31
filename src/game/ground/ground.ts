import * as PIXI from "pixi.js";

import { GameObject } from "../abstract/game-object";

export class Ground extends GameObject {
    constructor() {
        super(PIXI.Texture.from("ground.png"));
    }
}
