import { GameSettings } from "../models/game-settings";
import { GameObject } from "../interfaces/game-object";
export class Ground extends PIXI.Sprite implements GameObject {
    private ticker: PIXI.ticker.Ticker;

    constructor() {
        super();

        this.texture = PIXI.Texture.fromImage("ground.png");

        this.ticker = new PIXI.ticker.Ticker();
        this.ticker.add(this._startMoving, this);
    }

    get body(): PIXI.Sprite {
        return this;
    }

    // TODO: 
    // move this logic in obstacle's controller
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
