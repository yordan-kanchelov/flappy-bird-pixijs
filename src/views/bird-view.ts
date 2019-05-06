import * as PIXI from "pixi.js";

import { Bird } from "../game-objects/bird";

export class BirdView {
    private _bird: Bird;

    constructor(birdX: number, birdY: number) {
        this._bird = new Bird();
        this.bird.x = birdX;
        this.bird.y = birdY;

        this.startMovingWings();
    }

    get bird(): Bird {
        return this._bird;
    }

    public startMovingWings(): void {
        this._bird.startMovingWings();
    }

    public stopMovingWings(): void {
        this._bird.stopMovingWings();
    }
}
