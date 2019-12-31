import * as PIXI from "pixi.js";

// import { PixiConsole } from "pixi-console";
import PixiFps from "pixi-fps";

export class GameView extends PIXI.Container {
    private _stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        super();

        this._stage = stage;

        stage.addChild(this);
    }

    get stage(): PIXI.Container {
        return this._stage;
    }
}
