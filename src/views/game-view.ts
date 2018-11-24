import { PixiConsole } from "pixi-console";
import PixiFps from "pixi-fps";
export class GameView extends PIXI.Container {
    private _stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        super();
        this._stage = stage;

        // TODO:
        // create debug controller & view
        // place the console and fps counter there
        this.addChild(PixiConsole.getInstance());
        this.addChild(
            new PixiFps({
                fontSize: 12,
            } as PIXI.TextStyle),
        );

        stage.addChild(this);
    }

    get stage(): PIXI.Container {
        return this._stage;
    }
}
