import * as PIXI from "pixi.js";

import { GameObject } from "../../abstract/game-object";
import { World } from "../../world";

export class BirdRotationBehavior {
    public gameObject: GameObject;
    public rotationTicker: PIXI.Ticker;

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject;

        this.rotationTicker = new PIXI.Ticker();
        this.rotationTicker.add(() => {
            this.rotate();
        });
        this.rotationTicker.start();
    }

    rotate(): void {
        if (World.isObjectOnGround(this.gameObject)) {
            return;
        }

        if (this.gameObject.health !== 0) {
            if (this.gameObject.velocityY > 0 && this.gameObject.rotation < 0.5) {
                this.gameObject.rotation += this.gameObject.velocityY / 40;
            } else if (this.gameObject.velocityY < 0 && this.gameObject.rotation > -0.3) {
                this.gameObject.rotation -= 0.05;
            }
        } else {
            this.gameObject.rotation += 0.1;
        }
    }

    dispose(): void {
        this.gameObject = null;
        this.rotationTicker.stop();
        this.rotationTicker = null;
    }
}
