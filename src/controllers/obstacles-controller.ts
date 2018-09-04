import { PipeObstacle } from "../game-objects/pipes-obstacle";
import { GameSettings } from "../models/game-settings";
import { ObstaclesView } from "../views/obstacles-view";

export class ObstaclesController {
    private readonly PIPES_COUNT: number = 3;

    private _view: ObstaclesView;
    private _pipeObstacles: PipeObstacle[];
    private _gameSettings: GameSettings = GameSettings.getInstance();

    private _nextPipeObstacleIndex: number;
    private _moveObstacleTicker: PIXI.ticker.Ticker;

    constructor(view: ObstaclesView) {
        this._view = view;
        this._pipeObstacles = [];

        this._nextPipeObstacleIndex = 0;

        this._moveObstacleTicker = new PIXI.ticker.Ticker();
        this._moveObstacleTicker.add(this.movePipes.bind(this));

        this.addObstacles();
    }

    get PipeObstacles(): PipeObstacle[] {
        return this._pipeObstacles;
    }
    get NextPipeObstacle(): PipeObstacle {
        return this._pipeObstacles[this._nextPipeObstacleIndex];
    }

    public stopMoving(): void {
        this._moveObstacleTicker.stop();
    }

    public startMoving(): void {
        this._moveObstacleTicker.start();
    }

    public resetObstacles(): void {
        this.resetPipesPosition();
    }

    private addObstacles(): void {
        for (let i = 0; i < 3; i++) {
            const pipeObstacle: PipeObstacle = new PipeObstacle();
            pipeObstacle.x =
                this._gameSettings.gameWidth + pipeObstacle.width * i + i * this._gameSettings.obstaclesDistance;

            if (i == 0) pipeObstacle.isNextObstacle = true;

            this._view.addChild(pipeObstacle);
            this._pipeObstacles.push(pipeObstacle);
        }
    }

    private resetPipesPosition(): void {
        this._nextPipeObstacleIndex = 0;
        this._pipeObstacles[0].isNextObstacle = true;

        // TODO:
        // move this in the view;
        for (let i = 0; i < this._pipeObstacles.length; i++) {
            this._pipeObstacles[i].updateObstacle();
            this._pipeObstacles[i].x =
                this._gameSettings.gameWidth +
                this._pipeObstacles[i].width * i +
                i * this._gameSettings.obstaclesDistance;
        }
    }

    // TODO:
    // move this in the view
    // refactor 
    // get event when the pipe is out of screen and update the obstacle afterward
    private movePipes(): void {
        for (let i = 0; i < this._pipeObstacles.length; i += 1) {
            if (
                this._pipeObstacles[i].x <
                this._gameSettings.birdStartingXPosition - PIXI.Texture.fromImage("birdMiddle.png").width / 2
            ) {
                if (this._nextPipeObstacleIndex < this.PIPES_COUNT - 1) this._nextPipeObstacleIndex++;
                else {
                    this._nextPipeObstacleIndex = 0;
                }
            }

            if (this._pipeObstacles[i].x < -this._pipeObstacles[i].upperPipe.width) {
                this._pipeObstacles[i].updateObstacle();
                this._pipeObstacles[i].x = this._gameSettings.gameWidth + this._gameSettings.obstaclesDistance;
            }

            this._pipeObstacles[i].x -= this._gameSettings.obstaclesSpeed;
        }
    }
}
