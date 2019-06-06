import * as PIXI from "pixi.js";

import PixiEventResolver from "pixi-event-resolver";
import Utils from "../utils/utils";

import { GameSettings } from "../models/game-settings";
import { CollisionChecker } from "../utils/collision-checker";
import { ObstaclesView } from "../views/obstacles-view";
import { GameView } from "../views/game-view";
import { BirdController } from "./bird-controller";
import { ObstaclesController } from "./obstacles-controller";
import { World } from "../models/world";
import { GameModel } from "../models/game-model";

export class GameController {
    private _view: GameView;
    private _model: GameModel;

    private _obstaclesController: ObstaclesController;
    private _obstaclesView: ObstaclesView;
    private _birdController: BirdController;

    private _gameScoreText: PIXI.Text;
    private _collisionCheckTicker: PIXI.Ticker;

    private _scorePointSound: Howl;
    private _hitSound: Howl;

    constructor(model: GameModel, view: GameView) {
        World.getInstance().stage = view.stage;
        World.setBackground(PIXI.Texture.from("background.png"));

        this._view = view;
        this._model = model;
        this._scorePointSound = Utils.getHowlSound("sfx_point.wav");
        this._hitSound = Utils.getHowlSound("sfx_hit.wav");

        this.initObstacles();
        this.initPlayerBird();
        this.initGameScoreText();
        this.setupEvents();

        this._collisionCheckTicker = new PIXI.Ticker();
        this._collisionCheckTicker.add(this.onCollisionCheckTick.bind(this));
        this._collisionCheckTicker.start();

        this._obstaclesController.startMoving();
    }

    private initPlayerBird(): any {
        this._birdController = new BirdController();
    }

    private initObstacles(): any {
        this._obstaclesView = new ObstaclesView();
        this._obstaclesController = new ObstaclesController(this._obstaclesView);
    }

    // TODO:
    // move to view
    private initGameScoreText(): any {
        this._gameScoreText = new PIXI.Text(this._model.gameScore.toString(), {
            fontSize: 20,
            fill: 0xffffff,
            fontWeight: "bold",
        });

        this._view.stage.addChild(this._gameScoreText);
        this.updateGameScore();
    }

    private onKeyDown(key: KeyboardEvent) {
        if (key.keyCode == 32) {
            this.mainAction();
        }
    }

    private mainAction(): void {
        if (this._model.gameOver) {
            this.restart();
        } else {
            this._birdController.fly();
        }
    }

    private onCollisionCheckTick(): void {
        if (this._model.gameOver) {
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
            this._model.gameOver = true;
            this.onBirdHit();
        }
    }

    private restart(): void {
        this._model.resetModel();

        this.updateGameScore();
        this._birdController.resetBird();
        this._obstaclesController.resetObstacles();
        this._obstaclesController.startMoving();
        this._collisionCheckTicker.start();
    }

    private onBirdHit(): void {
        if (this._birdController.bird.health != 0) {
            this._hitSound.play();

            this._birdController.birdHealth = 0;
            this._obstaclesController.stopMoving();
        }
    }

    private onPipePassed(): any {
        this._model.incrementScore(1);
        this._scorePointSound.play();

        this.updateGameScore();
    }

    private updateGameScore() {
        this._gameScoreText.text = this._model.gameScore.toString();

        // center text
        const gameWidth = GameSettings.getInstance().gameWidth;
        this._gameScoreText.position.set(gameWidth / 2 - this._gameScoreText.width / 2, 20);
    }

    private setupEvents(): any {
        // collision
        this._obstaclesController.on(ObstaclesController.PIPE_PASSED, () => {
            this.onPipePassed();
        });

        // fly events
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            this.onKeyDown(e);
        });

        this._view.stage.addListener(
            PixiEventResolver.resolve("mousedown") as PIXI.interaction.InteractionEventTypes,
            () => this.mainAction()
        );
    }
}
