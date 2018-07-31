import { BirdFlyFlappyBehavior } from "../behaviors/bird-fly-flappy-behavior";
import { BirdGravityBehavior } from "../behaviors/bird-gravity-behavior";
import { IFlyBehavior } from "../behaviors/fly-behavior";
import { IGravityBehavior } from "../behaviors/gravity-behavior";
import { GameSettings } from "../models/game-settings";
import { BirdView } from "../views/bird-view";

export class BirdController extends PIXI.Container {
    private _view: BirdView;
    private _gameSettings: GameSettings;

    private _gravityBehavior: IGravityBehavior;
    private _flyBehavior: IFlyBehavior;

    private _isHit: boolean;
    private _hasFallen: boolean;

    constructor(view: BirdView) {
        super();
        this._gameSettings = GameSettings.getInstance();
        this._view = view;

        this._hasFallen = false;

        this.updateBirdBehaviors();
    }

    get birdBody(): PIXI.Sprite {
        return this._view.body;
    }

    get hasFallen(): boolean {
        return this._hasFallen;
    }
    set hasFallen(value: boolean) {
        if (value) {
            this.stopBirdGravity();
        }
        this._hasFallen = value;
    }

    get isHit(): boolean {
        return this._isHit;
    }
    set isHit(value: boolean) {
        if (value) {
            this.onBirdHit();
        }
        this._isHit = value;
    }

    public fly(): void {
        if (!this._isHit) {
            this._flyBehavior.fly();
        }
    }

    private updateBirdBehaviors(): void {
        this._gravityBehavior = new BirdGravityBehavior(this._view, this._gameSettings.birdStartingVelocity);
        this._flyBehavior = new BirdFlyFlappyBehavior(this._gravityBehavior);
    }

    public resetBird(): void {
        this._view.body.x = this._gameSettings.birdStartingXPosition;
        this._view.body.y = this._gameSettings.birdStartingYPosition;
        this._view.body.rotation = 0;

        this._gravityBehavior.velocityY = this._gameSettings.birdStartingVelocity;

        this.isHit = false;
        this.hasFallen = false;

        this._view.startBirdFlapping();
        this.startBirdGravity();
    }

    private startBirdGravity(): void {
        this._gravityBehavior.gravityTicker.start();
    }
    private stopBirdGravity(): void {
        this._gravityBehavior.gravityTicker.stop();
    }

    private onBirdHit(): void {
        this._isHit = true;
        this._gravityBehavior.velocityY = 0;
        this._view.stopBirdFlapping();
    }
}
