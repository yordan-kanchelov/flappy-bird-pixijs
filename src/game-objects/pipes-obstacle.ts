import { GameSettings } from "../models/game-settings";
import { Pipe } from "./pipe";

export class PipeObstacle extends PIXI.Container {
    private upperPipe: Pipe;
    private bottomPipe: Pipe;
    private isNextObstacle: boolean;

    constructor(isNextObstacle: boolean = false) {
        super();

        this.upperPipe = new Pipe(true);
        this.bottomPipe = new Pipe(false);

        this.updateObstacle();

        this.addChild(this.upperPipe);
        this.addChild(this.bottomPipe);
    }

    get UpperPipe(): Pipe {
        return this.upperPipe;
    }
    get BottomPipe(): Pipe {
        return this.bottomPipe;
    }
    get IsNextObstacle(): boolean {
        return this.isNextObstacle;
    }
    set IsNextObstacle(value: boolean) {
        this.isNextObstacle = value;
    }

    public updateObstacle(): void {
        const upperOffset: number = Math.floor(Math.random() * 100 + 1);
        this.upperPipe.y = -upperOffset;
        this.bottomPipe.y = this.UpperPipe.y + this.UpperPipe.height + GameSettings.getInstance().pipeObstaclesGap;
    }
}
