import { GameObject } from "../interfaces/game-object";
import { IRotationBehavior } from "../interfaces/behaviors/rotation-behavior";
import { World } from "../models/world";

export class BirdRotationBehavior implements IRotationBehavior {
    public gameObject: GameObject;
    public rotationTicker: PIXI.ticker.Ticker;

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject;

        this.rotationTicker = new PIXI.ticker.Ticker();
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
            if (this.gameObject.velocityY > 0 && this.gameObject.body.rotation < 0.5) {
                this.gameObject.body.rotation += this.gameObject.velocityY / 40;
            } else if (this.gameObject.velocityY < 0 && this.gameObject.body.rotation > -0.3) {
                this.gameObject.body.rotation -= 0.05;
            }
        } else {
            this.gameObject.body.rotation += 0.1;
        }
    }

    dispose(): void {
        this.gameObject = null;
        this.rotationTicker.stop();
        this.rotationTicker = null;
    }
}
