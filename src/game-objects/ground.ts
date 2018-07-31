import { GameSettings } from "../models/game-settings";

export class Ground extends PIXI.Sprite {
    private gameSettings: GameSettings;

    private ticker: PIXI.ticker.Ticker;

    constructor() {
        super();
        this.texture = PIXI.Texture.fromImage("ground.png");

        this.ticker = new PIXI.ticker.Ticker();
        this.ticker.autoStart = false;
        this.ticker.speed = 1;
        this.ticker.add(this._startMoving, this);
        this.ticker.start();

        this.gameSettings = GameSettings.getInstance();
    }

    public startMoving() {
        this.ticker.start();
    }

    public stopMoving() {
        this.ticker.stop();
    }

    private _startMoving() {
        this.x -= 2;

        if (-this.x === this.texture.width - this.gameSettings.gameWidth) {
            this.x = 0;
        }
    }
}
