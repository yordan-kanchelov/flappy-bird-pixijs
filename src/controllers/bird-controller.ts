import { GameSettings } from "../models/game-settings";
import { Bird } from "../game-objects/bird";
import { World } from "../models/world";

export class BirdController {
    private _gameSettings: GameSettings;

    private _bird: Bird;

    constructor() {
        this._gameSettings = GameSettings.getInstance();
        this._bird = new Bird();

        World.addObjectToWorld(this.bird);
    }

    get bird(): Bird {
        return this._bird;
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

        this.bird.startMovingWings();
    }

    private onBirdHit(): void {
        if (this.bird.velocityY < 0) {
            this.bird.velocityY = 0;
        }

        this.bird.stopMovingWings();
    }
}
