import { GameSettings } from "../models/game-settings";
import { GameObject } from "../interfaces/game-object";

export class Pipe extends PIXI.Sprite implements GameObject {
    constructor(upperPipe: boolean = true) {
        super();

        const pipeTexture = PIXI.Texture.fromImage(upperPipe ? "pipeUp.png" : "pipeDown.png");
        this.texture = pipeTexture;
    }

    get body(): PIXI.Sprite {
        return this;
    }
}
