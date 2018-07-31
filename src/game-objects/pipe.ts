import { GameSettings } from "../models/game-settings";
import { GameObject } from "./game-object";

export class Pipe extends PIXI.Container implements GameObject {
    body: PIXI.Sprite;

    constructor(upperPipe: boolean = true) {
        super();

        const gameSettings: GameSettings = GameSettings.getInstance();

        this.body = new PIXI.Sprite(PIXI.Texture.fromImage(upperPipe ? "pipeUp.png" : "pipeDown.png"));

        if (!upperPipe) {
            this.y = gameSettings.groundYPos - this.body.texture.height;
        }

        this.addChild(this.body);
    }
}
