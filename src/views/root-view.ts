import { PixiConsole } from "pixi-console";
import PixiFps from "pixi-fps";
export class RootView extends PIXI.Container {
    private _stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        super();
        this.interactive = true;
        this._stage = stage;

        stage.addChild(this);
        stage.addChild(PixiConsole.getInstance());
        stage.addChild(
            new PixiFps({
                fontSize: 12,
            } as PIXI.TextStyle),
        );
    }

    get stage(): PIXI.Container {
        return this._stage;
    }
}
