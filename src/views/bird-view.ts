import { GameObject } from "../game-objects/game-object";

export class BirdView extends PIXI.Container implements GameObject {
    public body: PIXI.Sprite;

    private birdTextures: PIXI.Texture[];
    private birdPhase: number;

    private then: number;
    private interval: number;
    private delta: number;

    private birdFlappying: boolean;

    constructor(birdX: number, birdY: number) {
        super();

        const fps = 60;
        this.then = Date.now();
        this.interval = 3000 / fps;
        this.delta;

        this.birdPhase = 0;
        this.birdTextures = [
            PIXI.Texture.fromImage("birdDown.png"),
            PIXI.Texture.fromImage("birdMiddle.png"),
            PIXI.Texture.fromImage("birdUp.png"),
        ];

        this.body = new PIXI.Sprite(this.birdTextures[0]);
        this.body.anchor.x = this.body.anchor.y = 0.5;
        this.body.x = birdX;
        this.body.y = birdY;
        this.addChild(this.body);

        this.startBirdFlapping();
    }

    public stopBirdFlapping(): void {
        this.birdFlappying = false;
    }

    public startBirdFlapping(): void {
        this.birdFlappying = true;
        requestAnimationFrame(() => {
            if (this.birdFlappying) this.startBirdFlapping();
        });

        const now = Date.now();
        this.delta = now - this.then;

        if (this.delta > this.interval) {
            this.then = now - (this.delta % this.interval);

            if (this.birdPhase > 2) {
                this.birdPhase = 0;
            }

            this.body.texture = this.birdTextures[this.birdPhase];
            this.birdPhase += 1;
        }
    }
}
