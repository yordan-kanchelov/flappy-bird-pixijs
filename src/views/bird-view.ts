import { GameObject } from "../game-objects/game-object";
import { Bird } from "../game-objects/bird";

export class BirdView extends PIXI.Container {
    private bird: Bird;

    constructor(birdX: number, birdY: number) {
        super();

        this.bird = new Bird();
        this.body.x = birdX;
        this.body.y = birdY;
        this.addChild(this.body);

        this.startMovingWings();
    }

    get body(): PIXI.Sprite {
        return this.bird.body;
    }

    public startMovingWings(): void {
        this.bird.startMovingWings();
    }

    public stopMovingWings(): void {
        this.bird.stopMovingWings();
    }
}
