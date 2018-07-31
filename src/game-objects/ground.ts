import { GameSettings } from "../models/game-settings";
import { GameObject } from "./game-object";

export class Ground extends PIXI.Container implements GameObject {
    body: PIXI.Sprite;

    private ticker: PIXI.ticker.Ticker;

    constructor() {
        super();

        this.body = new PIXI.Sprite(PIXI.Texture.fromImage("ground.png"));

        this.ticker = new PIXI.ticker.Ticker();
        this.ticker.add(this._startMoving, this);

        this.addChild(this.body);
    }

    public startMoving() {
        this.ticker.start();
    }

    public stopMoving() {
        this.ticker.stop();
    }

    private _startMoving() {
        this.x -= 2;

        if (-this.x === this.body.texture.width - GameSettings.getInstance().gameWidth) {
            this.x = 0;
        }
    }
}
