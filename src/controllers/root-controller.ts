import { Ground } from "../game-objects/ground";
import { GameSettings } from "../models/game-settings";
import { CollisionChecker } from "../utils/collision-checker";
import { BirdView } from "../views/bird-view";
import { ObstaclesView } from "../views/obstacles-view";
import { RootView } from "../views/root-view";
import { BirdController } from "./bird-controller";
import { ObstaclesController } from "./obstacles-controller";

export class RootController extends PIXI.Container {
    private _view: RootView;

    private _obstaclesController: ObstaclesController;
    private _obstaclesView: ObstaclesView;
    private _birdController: BirdController;
    private _birdView: BirdView;

    private _gameSettings: GameSettings;
    private _gameOver: boolean = false; // when set to true checkBirdCollision method will stop;

    constructor(view: RootView) {
        super();
        this._view = view;

        this._gameSettings = GameSettings.getInstance();

        this.addBackground();

        this._birdView = new BirdView(
            this._gameSettings.birdStartingXPosition,
            this._gameSettings.birdStartingYPosition,
        );
        this._birdController = new BirdController(this._birdView);

        document.addEventListener("keydown", (e: KeyboardEvent) => {
            this.onKeyDown(e);
        });
        (view as any).click = (view as any).touchstart = () => {
            this.mainAction();
        };

        this._obstaclesView = new ObstaclesView();
        this._obstaclesController = new ObstaclesController(this._obstaclesView);
        view.addChild(this._obstaclesView);

        view.addChild(this._birdView);

        this._obstaclesController.startMoving();

        this.checkBirdCollision.bind(this)();
    }

    public addBackground(): any {
        const backgroundSprite = new PIXI.Sprite(PIXI.Texture.fromImage("background.png"));
        this._view.addChild(backgroundSprite);
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

    private checkBirdCollision(): void {
        // TODO
        // replace with ticker
        requestAnimationFrame(() => {
            if (!this._gameOver && !this._birdController.hasFallen) this.checkBirdCollision();
        });

        //pipe collision
        if (this._birdController.bird.health !== 0) {
            if (CollisionChecker.pipeCollision(this._birdController.bird, this._obstaclesController.NextPipeObstacle)) {
                this.onBirdHit();
            }
        }

        //groundHit
        if (CollisionChecker.groundCollision(this._birdController.bird, this._obstaclesController.GroundObstacle)) {
            this._gameOver = true;
            this._birdController.hasFallen = true;
            this.onBirdHit();
        }
    }

    private restart(): void {
        this._gameOver = false;

        this._birdController.resetBird();
        this._obstaclesController.resetObstacles();
        this._obstaclesController.startMoving();
        this.checkBirdCollision();
    }

    private onBirdHit(): void {
        this._birdController.birdHealth = 0;
        this._obstaclesController.stopMoving();
    }
}
