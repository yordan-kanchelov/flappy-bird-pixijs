import { GameSettings } from "../models/game-settings";
import { GameObject } from "../interfaces/game-object";

export class Pipe extends PIXI.Sprite implements GameObject {
    constructor(upperPipe: boolean = true) {
        super();

        const gameSettings: GameSettings = GameSettings.getInstance();

        this.texture = PIXI.Texture.fromImage(upperPipe ? "pipeUp.png" : "pipeDown.png");

        if (!upperPipe) {
            this.y = gameSettings.groundYPos - this.body.texture.height;
        }

        this.addChild(this.body);
    }

    get body(): PIXI.Sprite {
        return this;
    }
}
