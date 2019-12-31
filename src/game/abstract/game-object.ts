import * as PIXI from "pixi.js";

export abstract class GameObject extends PIXI.Sprite {
    health: number;
    velocityX: number;
    velocityY: number;
    gravityPower: number;

    /**
     *
     */
    constructor(spriteTexture: PIXI.Texture) {
        super(spriteTexture);
    }
}
