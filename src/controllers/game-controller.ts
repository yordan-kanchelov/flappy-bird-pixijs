import PixiEventResolver from "pixi-event-resolver";
import { GameSettings } from "../models/game-settings";
import { CollisionChecker } from "../utils/collision-checker";
import { BirdView } from "../views/bird-view";
import { ObstaclesView } from "../views/obstacles-view";
import { GameView } from "../views/game-view";
import { BirdController } from "./bird-controller";
import { ObstaclesController } from "./obstacles-controller";
import { World } from "../models/world";
import { RootModel } from "../models/root-model";

export class GameController {
    private _view: GameView;
    private _model: RootModel;

    private _obstaclesController: ObstaclesController;
    private _obstaclesView: ObstaclesView;
    private _birdController: BirdController;
    private _birdView: BirdView;

    private _gameSettings: GameSettings;
    private _gameOver: boolean = false; // when set to true checkBirdCollision method will stop;
    private _collisionCheckTicker: PIXI.ticker.Ticker;

    constructor(model: RootModel, view: GameView) {
        World.getInstance().stage = view.stage;
        World.setBackground(PIXI.Texture.fromImage("background.png"));

        this._view = view;
        this._model = model;
        this._gameSettings = GameSettings.getInstance();

        this._obstaclesView = new ObstaclesView();
        this._obstaclesController = new ObstaclesController(this._obstaclesView);

        this._birdView = new BirdView(
            this._gameSettings.birdStartingXPosition,
            this._gameSettings.birdStartingYPosition,
        );
        this._birdController = new BirdController(this._birdView);

        this.setupEvents();

        this._collisionCheckTicker = new PIXI.ticker.Ticker();
        this._collisionCheckTicker.add(this.onCollisionCheckTick.bind(this));
        this._collisionCheckTicker.start();

        this._obstaclesController.startMoving();
    }

    private onKeyDown(key: KeyboardEvent) {
        if (key.keyCode == 32) {
            this.mainAction();
        }
    }

    private mainAction(): void {
        if (this._gameOver) {
            this.restart();
        } else {
            this._birdController.fly();
        }
    }

    private onCollisionCheckTick(): void {
        if (this._gameOver) {
            this._collisionCheckTicker.stop();
        }

        //pipe collision
        if (this._birdController.bird.health !== 0) {
            if (CollisionChecker.pipeCollision(this._birdController.bird, this._obstaclesController.NextPipeObstacle)) {
                this.onBirdHit();
            }
        }

        //groundHit
        if (World.isObjectOnGround(this._birdController.bird)) {
            this._gameOver = true;
            this.onBirdHit();
        }
    }

    private restart(): void {
        this._gameOver = false;

        this._birdController.resetBird();
        this._obstaclesController.resetObstacles();
        this._obstaclesController.startMoving();
        this._collisionCheckTicker.start();
    }

    private onBirdHit(): void {
        this._birdController.birdHealth = 0;
        this._obstaclesController.stopMoving();
    }

    private setupEvents(): any {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            this.onKeyDown(e);
        });
        this._view.stage.addListener(
            PixiEventResolver.resolve("mousedown") as PIXI.interaction.InteractionEventTypes,
            () => this.mainAction(),
        );
    }
}
