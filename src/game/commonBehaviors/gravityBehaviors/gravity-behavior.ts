import * as PIXI from "pixi.js";

import { World } from "../../world";
import { GameObject } from "../../abstract/game-object";

export class GravityBehavior {
    public gameObject: GameObject;
    public gravityTicker: PIXI.Ticker;

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject;
        this.velocityY = 0;

        this.gravityTicker = new PIXI.Ticker();
        this.gravityTicker.add(this.gravity.bind(this));
        this.gravityTicker.start();
    }

    public gravity(): void {
        if (this.velocityY < 10) {
            this.velocityY += this.gameObject.gravityPower;
        }

        if (this.velocityY > 0 && World.isObjectOnGround(this.gameObject)) {
            return;
        }

        this.gameObject.y += this.velocityY;
    }

    public dispose(): void {
        this.gameObject = null;
        this.gravityTicker.stop();
        this.gravityTicker = null;
    }

    private get velocityY(): number {
        return this.gameObject.velocityY;
    }

    private set velocityY(value: number) {
        this.gameObject.velocityY = value;
    }
}
