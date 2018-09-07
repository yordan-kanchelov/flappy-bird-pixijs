import { PipeObstacle } from "../game-objects/pipes-obstacle";
import { GameSettings } from "../models/game-settings";
import { ObstaclesView } from "../views/obstacles-view";
import { Ground } from "../game-objects/ground";

export class ObstaclesController {
    private readonly PIPES_COUNT: number = 3;
    
    private _view: ObstaclesView;
    private _gameSettings: GameSettings = GameSettings.getInstance();
    
    private _nextPipeObstacleIndex: number;
    private _moveObstaclesTicker: PIXI.ticker.Ticker;
    
    constructor(view: ObstaclesView) {
        this._view = view;
        this._view.on(ObstaclesView.PIPE_PASSED, this.onPipePassed, this)
        
        this._nextPipeObstacleIndex = 0;
        
        this._moveObstaclesTicker = new PIXI.ticker.Ticker();
        this._moveObstaclesTicker.add(() => this.moveObstacles());
        
        this.addObstacles();
    }
    
    get NextPipeObstacle(): PipeObstacle {
        return this._view.pipeObstacles[this._nextPipeObstacleIndex];
    }

    get GroundObstacle(): Ground {
        return this._view.groundObstacle;
    }
    
    public startMoving(): void {
        this._moveObstaclesTicker.start();
    }
    
    public stopMoving(): void {
        this._moveObstaclesTicker.stop();
    }
    
    public resetObstacles(): void {
        this.resetPipesPosition();
    }
    
    private moveObstacles() {
        this.movePipes();
        this.moveGround();
    }

    private movePipes(): void {
        this._view.movePipes();
    }
    
    private moveGround(): void {
        this._view.moveGround();
    }
    
    private onPipePassed(): any {
        this._nextPipeObstacleIndex = this._nextPipeObstacleIndex < this.PIPES_COUNT - 1 ? this._nextPipeObstacleIndex + 1 : 0; 
        this._view.nextPipeObstacleIndex = this._nextPipeObstacleIndex;
    }

    private addObstacles(): void {
        this.addPipeObstacles();
        this.addGroundObstacle();
    }
    
    private addGroundObstacle() {
        let ground = new Ground();
        this._view.addGroundObstacle(new Ground(), this._gameSettings.gameHeight - ground.height)
    }
    
    private addPipeObstacles() {
        this._view.pipeObstacles = [];
        
        for (let i = 0; i < 3; i++) {
            const pipeObstacle: PipeObstacle = new PipeObstacle();
            pipeObstacle.x =
            this._gameSettings.gameWidth + pipeObstacle.width * i + i * this._gameSettings.obstaclesDistance;
            if (i == 0) pipeObstacle.isNextObstacle = true;
            this._view.addChild(pipeObstacle);
            this._view.pipeObstacles.push(pipeObstacle);
        }
    }
    
    private resetPipesPosition(): void {
        // TODO: 
        // nextPipeObsticle show be only in the controller or model 
        // remove it from the view 
        
        this._nextPipeObstacleIndex = 0;
        this._view.nextPipeObstacleIndex = 0;
        this._view.pipeObstacles[0].isNextObstacle = true;
        
        this._view.resetPipesPossition();
    }
}
