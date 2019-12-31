import * as PIXI from "pixi.js";

import { GravityBehavior as IGravityBehavior } from "../abstract/behaviors/gravity-behavior";
import { GravityBehavior } from "../commonBehaviors/gravityBehaviors/gravity-behavior";

import { FlyBehavior } from "../abstract/behaviors/fly-behavior";
import { BirdFlyFlappyBehavior } from "./behaviors/bird-fly-flappy-behavior";
import { BirdRotationBehavior } from "./behaviors/bird-rotation-behavior";
import { GameObject } from "../abstract/game-object";

export class Bird extends GameObject {
    private _gravityBehavior: IGravityBehavior;
    private _flyBehavior: FlyBehavior;
    private _rotationBehavior: BirdRotationBehavior;

    private _birdTextures: PIXI.Texture[];
    private _birdPhase: number;

    private _then: number;
    private _interval: number;
    private _delta: number;

    private birdFlapping: boolean;

    constructor() {
        super(PIXI.Texture.EMPTY);

        const fps = 60;
        this._then = Date.now();
        this._interval = 3000 / fps;
        this._delta;

        this._birdPhase = 0;
        this._birdTextures = [
            PIXI.Texture.from("birdDown.png"),
            PIXI.Texture.from("birdMiddle.png"),
            PIXI.Texture.from("birdUp.png"),
        ];

        this.texture = this._birdTextures[0];
        this.anchor.x = this.anchor.y = 0.5;
        this.gravityPower = 0.1;

        this._gravityBehavior = new GravityBehavior(this);
        this._flyBehavior = new BirdFlyFlappyBehavior(this);
        this._rotationBehavior = new BirdRotationBehavior(this);
    }

    fly() {
        this._flyBehavior.fly();
    }

    startMovingWings() {
        this.birdFlapping = true;

        // TODO:
        // use ticker
        requestAnimationFrame(() => {
            if (this.birdFlapping) {
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

            this.texture = this._birdTextures[this._birdPhase];
            this._birdPhase += 1;
        }
    }

    stopMovingWings() {
        this.birdFlapping = false;
    }
}
