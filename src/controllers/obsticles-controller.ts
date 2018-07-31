import { PipeObstacle } from "../game-objects/pipes-obstacle";
import { GameSettings } from "../models/game-settings";
import { ObstaclesView } from "../views/obsticles-view";

export class ObstaclesController extends PIXI.Container {
    private readonly PIPES_COUNT: number = 3;

    private pipeObstacles: PipeObstacle[];
    private view: ObstaclesView;
    private gameSettings: GameSettings = GameSettings.getInstance();

    private nextPipeObstacleIndex: number;
    private moveObstacleTicker: PIXI.ticker.Ticker;

    constructor(view: ObstaclesView) {
        super();
        this.view = view;
        this.pipeObstacles = [];

        this.nextPipeObstacleIndex = 0;

        this.moveObstacleTicker = new PIXI.ticker.Ticker();
        this.moveObstacleTicker.add(this.movePipes.bind(this));

        this.addObstacles();
    }

    get PipeObstacles(): PipeObstacle[] {
        return this.pipeObstacles;
    }
    get NextPipeObstacle(): PipeObstacle {
        return this.pipeObstacles[this.nextPipeObstacleIndex];
    }

    public stopMoving(): void {
        this.moveObstacleTicker.stop();
    }

    public startMoving(): void {
        this.moveObstacleTicker.start();
    }

    public resetObstacles(): void {
        this.resetPipesPosition();
    }

    private addObstacles(): void {
        for (let i = 0; i < 3; i++) {
            const pipeObstacle: PipeObstacle = new PipeObstacle();
            pipeObstacle.x =
                this.gameSettings.gameWidth + pipeObstacle.width * i + i * this.gameSettings.obstaclesDistance;

            if (i == 0) pipeObstacle.IsNextObstacle = true;

            this.view.addChild(pipeObstacle);
            this.pipeObstacles.push(pipeObstacle);
        }
    }

    private resetPipesPosition(): void {
        this.nextPipeObstacleIndex = 0;
        this.pipeObstacles[0].IsNextObstacle = true;
        for (let i = 0; i < this.pipeObstacles.length; i++) {
            this.pipeObstacles[i].updateObstacle();
            this.pipeObstacles[i].x =
                this.gameSettings.gameWidth + this.pipeObstacles[i].width * i + i * this.gameSettings.obstaclesDistance;
        }
    }

    private movePipes(): void {
        for (let i = 0; i < this.pipeObstacles.length; i += 1) {
            if (
                this.pipeObstacles[i].x <
                this.gameSettings.birdStartingXPosition - PIXI.Texture.fromImage("birdMiddle.png").width / 2
            ) {
                if (this.nextPipeObstacleIndex < this.PIPES_COUNT - 1) this.nextPipeObstacleIndex++;
                else {
                    this.nextPipeObstacleIndex = 0;
                }
            }

            if (this.pipeObstacles[i].x < -this.pipeObstacles[i].UpperPipe.width) {
                this.pipeObstacles[i].updateObstacle();
                this.pipeObstacles[i].x = this.gameSettings.gameWidth + this.gameSettings.obstaclesDistance;
            }

            this.pipeObstacles[i].x -= this.gameSettings.obstaclesSpeed;
        }
    }
}
