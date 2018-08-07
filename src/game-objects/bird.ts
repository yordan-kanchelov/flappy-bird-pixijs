import { GameObject } from "./game-object";

export class Bird extends PIXI.Sprite implements GameObject {
    private _birdTextures: PIXI.Texture[];
    private _birdPhase: number;

    private _then: number;
    private _interval: number;
    private _delta: number;

    private birdFlappying: boolean;

    constructor() {
        super();

        const fps = 60;
        this._then = Date.now();
        this._interval = 3000 / fps;
        this._delta;

        this._birdPhase = 0;
        this._birdTextures = [
            PIXI.Texture.fromImage("birdDown.png"),
            PIXI.Texture.fromImage("birdMiddle.png"),
            PIXI.Texture.fromImage("birdUp.png")
        ];

        this.texture = this._birdTextures[0];
        this.anchor.x = this.anchor.y = 0.5;
    }

    get body(): PIXI.Sprite {
        return this;
    }

    stopMovingWings() {
        this.birdFlappying = false;
    }

    startMovingWings() {
        this.birdFlappying = true;

        requestAnimationFrame(() => {
            if (this.birdFlappying) {
                this.startMovingWings();
            }
        });

        const now = Date.now();
        this._delta = now - this._then;

        if (this._delta > this._interval) {
            this._then = now - (this._delta % this._interval);

            if (this._birdPhase > 2) {
                this._birdPhase = 0;
            }

            this.body.texture = this._birdTextures[this._birdPhase];
            this._birdPhase += 1;
        }
    }
}
