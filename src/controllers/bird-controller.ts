import { BirdFlyFlappyBehavior } from "../behaviors/bird-fly-flappy-behavior";
import { BirdGravityBehavior } from "../behaviors/bird-gravity-behavior";
import { IFlyBehavior } from "../interfaces/behaviors/fly-behavior";
import { IGravityBehavior } from "../interfaces/behaviors/gravity-behavior";
import { GameSettings } from "../models/game-settings";
import { BirdView } from "../views/bird-view";
import { Bird } from "../game-objects/bird";
import { IRotationBehavior } from "../interfaces/behaviors/rotation-behavior";
import { BirdRotationBehavior } from "../behaviors/bird-rotation-behavior";

export class BirdController {
    private _view: BirdView;
    private _gameSettings: GameSettings;

    private _gravityBehavior: IGravityBehavior;
    private _flyBehavior: IFlyBehavior;
    private _rotationBehavior: IRotationBehavior;

    constructor(view: BirdView) {
        this._gameSettings = GameSettings.getInstance();
        this._view = view;

        this.updateBirdBehaviors();
    }

    get bird(): Bird {
        return this._view.bird;
    }

    set birdHealth(value: number) {
        if (value === 0) {
            this.onBirdHit();
        }

        this.bird.health = value;
    }

    public fly(): void {
        this._flyBehavior.fly();
    }

    public resetBird(): void {
        this.bird.x = this._gameSettings.birdStartingXPosition;
        this.bird.y = this._gameSettings.birdStartingYPosition;
        this.bird.rotation = 0;

        this.bird.velocityY = this._gameSettings.birdStartingVelocity;

        this.birdHealth = 100;

        this._view.startMovingWings();
    }

    private onBirdHit(): void {
        if (this.bird.velocityY < 0) {
            this.bird.velocityY = 0;
        }

        this._view.stopMovingWings();
    }

    private updateBirdBehaviors(): void {
        this._gravityBehavior = new BirdGravityBehavior(this.bird, this._gameSettings.birdStartingVelocity);
        this._flyBehavior = new BirdFlyFlappyBehavior(this.bird);
        this._rotationBehavior = new BirdRotationBehavior(this.bird);
    }
}
