import { PixiConsole } from "pixi-console";
export class RootView extends PIXI.Container {
    private _stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        super();
        this.interactive = true;
        this._stage = stage;
        stage.addChild(this);
        stage.addChild(PixiConsole.getInstance());
    }

    get stage(): PIXI.Container {
        return this._stage;
    }
}
