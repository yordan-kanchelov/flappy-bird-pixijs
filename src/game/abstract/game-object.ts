import * as PIXI from "pixi.js";

export abstract class GameObject extends PIXI.Sprite {
    health: number = 0;
    velocityX: number = 0;
    velocityY: number = 0;
    gravityPower: number = 0;

    /**
     *
     */
    constructor(spriteTexture: PIXI.Texture) {
        super(spriteTexture);
    }
}
