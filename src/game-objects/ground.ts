import { GameObject } from "../interfaces/game-object";
export class Ground extends PIXI.Sprite implements GameObject {
    health: number;
    velocityX: number;
    velocityY: number;

    constructor() {
        super();

        this.texture = PIXI.Texture.fromImage("ground.png");
    }

    get body(): PIXI.Sprite {
        return this;
    }
}
