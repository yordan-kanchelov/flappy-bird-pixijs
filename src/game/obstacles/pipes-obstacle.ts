import { GameSettings } from "../game-settings";
import { Pipe } from "./pipe";
import { Ground } from "../ground/ground";

export class PipeObstacle {
    private _upperPipe: Pipe;
    private _bottomPipe: Pipe;

    constructor() {
        this._upperPipe = new Pipe(true);
        this._bottomPipe = new Pipe(false);
        this._bottomPipe.y = GameSettings.getInstance().gameHeight - new Ground().height; // think for a better way

        this.updateObstacle();
    }

    public set x(xValue: number) {
        this._bottomPipe.x = xValue;
        this._upperPipe.x = xValue;
    }

    public get x(): number {
        return this._bottomPipe.x;
    }

    public get width(): number {
        // both pipes are with the same width so return one of them
        return this._upperPipe.width;
    }

    get upperPipe(): Pipe {
        return this._upperPipe;
    }
    get bottomPipe(): Pipe {
        return this._bottomPipe;
    }

    get pipes() {
        return [this.upperPipe, this.bottomPipe];
    }

    public updateObstacle(): void {
        const upperOffset: number = Math.floor(Math.random() * 100 + 1);
        this._upperPipe.y = -upperOffset;
        this._bottomPipe.y = this.upperPipe.y + this.upperPipe.height + GameSettings.getInstance().pipeObstaclesGap;
    }
}
