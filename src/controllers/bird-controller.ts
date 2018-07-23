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

    private isHitted: boolean;
    private hasFallen: boolean;

    constructor(view: BirdView) {
        super();
        this.gameSettings = GameSettings.getInstance();
        this.view = view;

        this.hasFallen = false;

        this.updateBirdBehaviors();
    } 

    get birdBody(): PIXI.Sprite {
        return this.view.body;
    }

    get HasFallen(): boolean {
        return this.hasFallen;
    }
    set HasFallen(value: boolean) {
        if (value) {
            this.stopBirdGravity();
        }
        this.hasFallen = value;
    }

    get IsHitted(): boolean {
        return this.isHitted;
    }
    set IsHitted(value: boolean) {
        if (value) {
            this.onBirdHit();
        }
        this.isHitted = value;
    }

    public fly(): void {
        if (!this.isHitted) {
            this.flyBehavior.fly();
        }
    }

    private updateBirdBehaviors(): void {
        this.gravityBehavior = new BirdGravityBehavior(this.view, this.gameSettings.birdStartingVelocity);
        this.flyBehavior = new BirdFlyFlappyBehavior(this.gravityBehavior);
    }

    public resetBird(): void {
        this.view.body.x = this.gameSettings.birdStartingXPossition;
        this.view.body.y = this.gameSettings.birdStartingYPossition;
        this.view.body.rotation = 0;

        this.gravityBehavior.velocityY = this.gameSettings.birdStartingVelocity;

        this.IsHitted = false;
        this.HasFallen = false;

        this.view.startBirdFlapping();
        this.startBirdGravity();
    }

    private startBirdGravity(): void {
        this.gravityBehavior.gravityTicker.start();
    }
    private stopBirdGravity(): void {
        this.gravityBehavior.gravityTicker.stop();
    }

    private onBirdHit(): void {
        this.isHitted = true;
        this.gravityBehavior.velocityY = 0;
        this.view.stopBirdFlapping();
    }
}
