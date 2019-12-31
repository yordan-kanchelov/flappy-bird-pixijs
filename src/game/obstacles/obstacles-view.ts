import * as PIXI from "pixi.js";

import { Ground } from "../ground/ground";
import { PipeObstacle } from "../obstacles/pipes-obstacle";
import { GameSettings } from "../models/game-settings";

export class ObstaclesView extends PIXI.utils.EventEmitter {
    public static readonly PIPE_PASSED = "pipePassed";

    groundObstacle: Ground;
    pipeObstacles: PipeObstacle[];
    nextPipeObstacleIndex: number = 0;

    constructor() {
        super();
    }

    movePipes() {
        if (
            this.pipeObstacles[this.nextPipeObstacleIndex].x + this.pipeObstacles[this.nextPipeObstacleIndex].width <
            this._gameSettings.birdStartingXPosition - PIXI.Texture.from("birdMiddle.png").width / 2
        ) {
            this.emit(ObstaclesView.PIPE_PASSED);
        }

        for (let i = 0; i < this.pipeObstacles.length; i += 1) {
            if (this.pipeObstacles[i].x < -this.pipeObstacles[i].upperPipe.width) {
                this.pipeObstacles[i].updateObstacle();
                this.pipeObstacles[i].x = this._gameSettings.gameWidth + this._gameSettings.obstaclesDistance;
            }

            this.pipeObstacles[i].x -= this._gameSettings.obstaclesSpeed;
        }
    }

    moveGround(moveStep: number) {
        this.groundObstacle.x += moveStep;

        if (-this.groundObstacle.x === this.groundObstacle.texture.width - this._gameSettings.gameWidth) {
            this.groundObstacle.x = 0;
        }
    }

    resetPipesPosition() {
        for (let i = 0; i < this.pipeObstacles.length; i++) {
            this.pipeObstacles[i].updateObstacle();
            this.pipeObstacles[i].x =
                this._gameSettings.gameWidth +
                this.pipeObstacles[i].width * i +
                i * this._gameSettings.obstaclesDistance;
        }
    }

    private get _gameSettings(): GameSettings {
        return GameSettings.getInstance();
    }
}
