import { IGameObject } from "../interfaces/game-object";

export class Pipe extends PIXI.Sprite implements IGameObject {
    health: number;
    velocityX: number;
    velocityY: number;

    constructor(upperPipe: boolean = true) {
        super();

        const pipeTexture = PIXI.Texture.fromImage(upperPipe ? "pipeUp.png" : "pipeDown.png");
        this.texture = pipeTexture;
    }

    get body(): PIXI.Sprite {
        return this;
    }
}
