import { GameSettings } from "../models/game-settings";
import { Pipe } from "./pipe";
import { World } from "../models/world";

export class PipeObstacle extends PIXI.Container {
    private _upperPipe: Pipe;
    private _bottomPipe: Pipe;

    constructor() {
        super();

        this._upperPipe = new Pipe(true);
        this._bottomPipe = new Pipe(false);
        this._bottomPipe.y = World.getInstance().ground.y;

        this.updateObstacle();

        this.addChild(this._upperPipe);
        this.addChild(this._bottomPipe);
    }

    get upperPipe(): Pipe {
        return this._upperPipe;
    }
    get bottomPipe(): Pipe {
        return this._bottomPipe;
    }

    public updateObstacle(): void {
        const upperOffset: number = Math.floor(Math.random() * 100 + 1);
        this._upperPipe.y = -upperOffset;
        this._bottomPipe.y = this.upperPipe.y + this.upperPipe.height + GameSettings.getInstance().pipeObstaclesGap;
    }
}
