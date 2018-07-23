import { GameObject } from "../game-objects/game-object";
import { IGravityBehavior } from "./gravity-behavior";

export class BirdGravityBehavior implements IGravityBehavior {

    public gameObject: GameObject;
    public gravityPower: number = 0.1;
    public gravityTicker: PIXI.ticker.Ticker;
    
    private _velocityY: number;
    private _isHitted: boolean;

    constructor(bird: GameObject, velocityY = 0, isHitted = false) {
        this.gameObject = bird;
        this.velocityY = velocityY;
        this.gravityTicker = new PIXI.ticker.Ticker();
        this.gravityTicker.add(this.gravity.bind(this));
        this.gravityTicker.start();

        this._isHitted = isHitted;
    }

    public gravity(): void {
        if (this.velocityY < 10) {
            this.velocityY += this.gravityPower;
        }

        this.gameObject.body.y += this.velocityY;

        console.log(this.gameObject.body.y)

        // bird rotation
        if (!this._isHitted) {
            if (this._velocityY > 0 && this.gameObject.body.rotation < 0.5) {
                this.gameObject.body.rotation += this._velocityY / 40;
            } else if (this._velocityY < 0 && this.gameObject.body.rotation > -0.3) {
                this.gameObject.body.rotation -= 0.05;
            }
        } else {
            this.gameObject.body.rotation += 0.1;
        }
    }

    set isHitted(value: boolean) {
        this._isHitted = value;
    }

    get velocityY(): number { return this._velocityY };
    set velocityY(value: number) {
        this._velocityY = value;
    }

    public dispose(): void {
        this.gameObject = null;
        this.gravityTicker.stop();
        this.gravityTicker = null;
    }
}
