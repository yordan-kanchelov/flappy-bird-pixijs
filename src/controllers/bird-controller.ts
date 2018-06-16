import { BirdFlyFlappyBehavior } from "../behaviors/bird-fly-flappy-behavior";
import { BirdGravityBehavior } from "../behaviors/bird-gravity-behavior";
import { IFlyBehavior } from "../behaviors/fly-behavior";
import { IGravityBehavior } from "../behaviors/gravity-behavior";
import { GameSettings } from "../models/game-setttings";
import { BirdView } from "../views/bird-view";

export class BirdController extends PIXI.Container {

    private view: BirdView;
    private gameSettings: GameSettings;

    private gravityBehavior: IGravityBehavior;
    private flyBehavior: IFlyBehavior;

    private isStatic: boolean;
    private hasFallen: boolean;

    constructor(view: BirdView) {
        super();
        this.gameSettings = GameSettings.getInstance();
        this.view = view;

        this.isStatic = false;
        this.hasFallen = false;

        this.updateBirdBehaviors();
    }

    get birdBody(): PIXI.Sprite { return this.view.body; }

    get IsStatic(): boolean { return this.isStatic; }
    set IsStatic(value: boolean) {
        if (value) {
            this.stopBirdGravity();
            this.view.stopBirdFlapping();
        }

        // in case of pause
        if (!this.gravityBehavior.isHitted && !this.hasFallen && !value) {
            this.startBirdGravity();
        }

        this.isStatic = value;
    }
    get HasFallen(): boolean { return this.hasFallen; }
    set HasFallen(value: boolean) {
        if (value) {
            this.stopBirdGravity();
        }
        this.hasFallen = value;
    }

    get IsHitted(): boolean { return this.gravityBehavior.isHitted; }
    set IsHitted(value: boolean) {
        if (value) {
            this.onBirdHit();
        }
        this.gravityBehavior.isHitted = value;
    }

    public fly(): void {
        this.flyBehavior.fly();
    }

    public resetBird(): void {
        this.view.body.x = this.gameSettings.birdStartingXPossition;
        this.view.body.y = this.gameSettings.birdStartingYPossition;
        this.view.body.rotation = 0;
        this.gravityBehavior.velocityY = this.gameSettings.birdStartingVelocity;
        this.IsHitted = false;
        this.HasFallen = false;
        this.IsStatic = false;

        this.view.startBirdFlapping();
        this.startBirdGravity();
    }

    private startBirdGravity(): void { this.gravityBehavior.gravityTicker.start(); }
    private stopBirdGravity(): void { this.gravityBehavior.gravityTicker.stop(); }

    private updateBirdBehaviors(): void {
        this.gravityBehavior = new BirdGravityBehavior(this.view, this.gameSettings.birdStartingVelocity);
        this.flyBehavior = new BirdFlyFlappyBehavior(this.gravityBehavior);
    }

    private onBirdHit(): void {
        this.gravityBehavior.velocityY = 0;
        this.view.stopBirdFlapping();
    }
}
