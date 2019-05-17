import { GameSettings } from "../models/game-settings";
import { BirdView } from "../views/bird-view";
import { Bird } from "../game-objects/bird";
import { World } from "../models/world";

export class BirdController {
    private _view: BirdView;
    private _gameSettings: GameSettings;

    constructor(view: BirdView) {
        this._gameSettings = GameSettings.getInstance();
        this._view = view;

        World.addObjectToWorld(this._view.bird);
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
        this.bird.fly();
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
}
