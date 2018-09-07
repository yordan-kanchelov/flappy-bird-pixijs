import { Ground } from "../game-objects/ground";
import { PipeObstacle } from "../game-objects/pipes-obstacle";
import { GameSettings } from "../models/game-settings";

export class ObstaclesView extends PIXI.Container {
    public static readonly PIPE_PASSED = "pipePassed";

    groundObstacle: Ground;
    pipeObstacles: PipeObstacle[];
    nextPipeObstacleIndex: number = 0;

    constructor() {
        super();
    }

    addGroundObstacle(ground: Ground, yPos: number): any {
        console.log(yPos);
        this.groundObstacle = ground;
        this.groundObstacle.y = yPos;
        this.addChild(this.groundObstacle);
    }

    movePipes() {
        if (
            this.pipeObstacles[this.nextPipeObstacleIndex].x + this.pipeObstacles[this.nextPipeObstacleIndex].width <
            this._gameSettings.birdStartingXPosition - PIXI.Texture.fromImage("birdMiddle.png").width / 2
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

    moveGround() {
        this.groundObstacle.x -= this._gameSettings.groundMoveSpeed;

        if (-this.groundObstacle.x === this.groundObstacle.body.texture.width - this._gameSettings.gameWidth) {
            this.groundObstacle.x = 0;
        }
    }

    resetPipesPossition() {
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
