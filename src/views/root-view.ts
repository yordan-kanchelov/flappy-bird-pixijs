export class RootView extends PIXI.Container {
    private _stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        super();
        this.interactive = true;
        this._stage = stage;
        stage.addChild(this);
    }

    get stage(): PIXI.Container {
        return this._stage;
    }
}
