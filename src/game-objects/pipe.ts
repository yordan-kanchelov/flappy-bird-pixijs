import { GameSettings } from "../models/game-setttings";

export class Pipe extends PIXI.Sprite {

    constructor(upperPipe: boolean = true) {
        super();

        const gameSettings: GameSettings = GameSettings.getInstance();

        this.texture = PIXI.Texture.fromImage(upperPipe ? "pipeUp.png" : "pipeDown.png");

        if (!upperPipe) {
            this.y = gameSettings.groundYPos - this.texture.height;
        }

    }
}
