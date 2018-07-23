import { GameSettings } from "../models/game-setttings";
import { Pipe } from "./pipe";

export class PipeObsticle extends PIXI.Container {
    private upperPipe: Pipe;
    private bottomPipe: Pipe;
    private isNextObsticle: boolean;

    constructor(isNextObsticle: boolean = false) {
        super();

        this.upperPipe = new Pipe(true);
        this.bottomPipe = new Pipe(false);

        this.updateObsticle();

        this.addChild(this.upperPipe);
        this.addChild(this.bottomPipe);
    }

    get UpperPipe(): Pipe {
        return this.upperPipe;
    }
    get BottomPipe(): Pipe {
        return this.bottomPipe;
    }
    get IsNextObsticle(): boolean {
        return this.isNextObsticle;
    }
    set IsNextObsticle(value: boolean) {
        this.isNextObsticle = value;
    }

    public updateObsticle(): void {
        const upperOffset: number = Math.floor(Math.random() * 100 + 1);
        this.upperPipe.y = -upperOffset;
        this.bottomPipe.y = this.UpperPipe.y + this.UpperPipe.height + GameSettings.getInstance().pipeObsticlesGap;
    }
}
