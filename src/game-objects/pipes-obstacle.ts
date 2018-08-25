import { GameSettings } from "../models/game-settings";
import { Pipe } from "./pipe";
import { GameObject } from "../interfaces/game-object";

export class PipeObstacle extends PIXI.Container {
    private _upperPipe: Pipe;
    private _bottomPipe: Pipe;
    private _isNextObstacle: boolean;

    constructor(isNextObstacle: boolean = false) {
        super();

        this._isNextObstacle = isNextObstacle;

        this._upperPipe = new Pipe(true);
        this._bottomPipe = new Pipe(false);

        this.updateObstacle();

        this.addChild(this._upperPipe);
        this.addChild(this._bottomPipe);

        this.addChild(this);
    }

    get upperPipe(): Pipe {
        return this._upperPipe;
    }
    get bottomPipe(): Pipe {
        return this._bottomPipe;
    }
    get isNextObstacle(): boolean {
        return this._isNextObstacle;
    }
    set isNextObstacle(value: boolean) {
        this._isNextObstacle = value;
    }

    public updateObstacle(): void {
        const upperOffset: number = Math.floor(Math.random() * 100 + 1);
        this._upperPipe.y = -upperOffset;
        this._bottomPipe.y = this.upperPipe.y + this.upperPipe.height + GameSettings.getInstance().pipeObstaclesGap;
    }
}
