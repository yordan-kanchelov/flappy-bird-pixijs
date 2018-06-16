import { GameObject } from "../game-objects/game-object";
import { IGravityBehavior } from "./gravity-behavior";

export class BirdGravityBehavior implements IGravityBehavior {

    public gameObject: GameObject;
    public gravityPower: number = 0.1;
    public velocityY: number;
    public isHitted: boolean;
    public gravityTicker: PIXI.ticker.Ticker;

    constructor(bird: GameObject, velocityY = 0, isHitted = false) {
        this.gameObject = bird;
        this.velocityY = velocityY;
        this.isHitted = isHitted;
        this.gravityTicker = new PIXI.ticker.Ticker();
        this.gravityTicker.add(this.gravity.bind(this));
        this.gravityTicker.start();
    }

    public gravity(): void {
        if (this.velocityY < 10) {
            this.velocityY += this.gravityPower;
        }

        this.gameObject.body.y += this.velocityY;

        // bird rotation
        if (!this.isHitted) {
            if (this.velocityY > 0 && this.gameObject.body.rotation < 0.5) {
                this.gameObject.body.rotation += this.velocityY / 40;
            } else if (this.velocityY < 0 && this.gameObject.body.rotation > -0.3) {
                this.gameObject.body.rotation -= 0.05;
            }
        } else {
            this.gameObject.body.rotation += 0.1;
        }
    }

    public dispose(): void {
        this.gameObject = null;
        this.gravityTicker.stop();
        this.gravityTicker = null;
    }
}
