import { Bird } from "../game-objects/bird";

export class BirdView extends PIXI.Container {
    private _bird: Bird;

    constructor(birdX: number, birdY: number) {
        super();

        this._bird = new Bird();
        this.bird.x = birdX;
        this.bird.y = birdY;
        this.addChild(this._bird);

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
