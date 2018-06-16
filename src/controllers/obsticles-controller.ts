import { PipeObsticle } from "../game-objects/pipes-obsticle";
import { GameSettings } from "../models/game-setttings";
import { ObsticlesView } from "../views/obsticles-view";

export class ObsticlesController extends PIXI.Container {
    private readonly PIPES_COUNT: number = 3;

    private pipeObsticles: PipeObsticle[];
    private view: ObsticlesView;
    private gameSettings: GameSettings = GameSettings.getInstance();

    private isRunning: boolean;
    private nextPipeObsticleIndex: number;

    constructor(view: ObsticlesView) {
        super();
        this.view = view;
        this.pipeObsticles = [];

        this.nextPipeObsticleIndex = 0;

        this.addObsticles();
        this.startMoving();
    }

    get PipeObsticles(): PipeObsticle[] { return this.pipeObsticles; }
    get NextPipeObsticle(): PipeObsticle { return this.pipeObsticles[this.nextPipeObsticleIndex]; }

    public stopMoving(): void {
        this.isRunning = false;
    }

    public startMoving(): void {
        this.isRunning = true;
        requestAnimationFrame(() => {
            if (this.isRunning) {
                this.startMoving();
            }
        });

        this.movePipes();
    }

    public resetObsticles(): void {
        this.resetPipesPossition();
    }

    private addObsticles(): void {
        for (let i = 0; i < 3; i++) {
            const pipeObsticle: PipeObsticle = new PipeObsticle();
            pipeObsticle.x = this.gameSettings.gameWidth + pipeObsticle.width * i + i * this.gameSettings.obsticlesDistance;

            if (i == 0)
                pipeObsticle.IsNextObsticle = true;

            this.view.addChild(pipeObsticle);
            this.pipeObsticles.push(pipeObsticle);
        }
    }

    private resetPipesPossition(): void {
        this.nextPipeObsticleIndex = 0;
        this.pipeObsticles[0].IsNextObsticle = true;
        for (let i = 0; i < this.pipeObsticles.length; i++) {
            this.pipeObsticles[i].updateObsticle();
            this.pipeObsticles[i].x = this.gameSettings.gameWidth + this.pipeObsticles[i].width * i + i * this.gameSettings.obsticlesDistance;
        }
    }

    private movePipes(): void {
        for (let i = 0; i < this.pipeObsticles.length; i += 1) {
            if (this.pipeObsticles[i].x < this.gameSettings.birdStartingXPossition - PIXI.Texture.fromImage("birdMiddle.png").width / 2) {
                if (this.nextPipeObsticleIndex < this.PIPES_COUNT - 1)
                    this.nextPipeObsticleIndex++;
                else {
                    this.nextPipeObsticleIndex = 0;
                }
            }

            if (this.pipeObsticles[i].x < -this.pipeObsticles[i].UpperPipe.width) {
                this.pipeObsticles[i].updateObsticle();
                this.pipeObsticles[i].x = this.gameSettings.gameWidth + this.gameSettings.obsticlesDistance;
            }

            this.pipeObsticles[i].x -= this.gameSettings.obsticlesSpeed;
        }
    }
}
