import { Ground } from "../game-objects/ground";
import { GameSettings } from "../models/game-settings";
import { CollisionChecker } from "../utils/collision-checker";
import { BirdView } from "../views/bird-view";
import { ObstaclesView } from "../views/obsticles-view";
import { RootView } from "../views/root-view";
import { BirdController } from "./bird-controller";
import { ObstaclesController } from "./obsticles-controller";

export class RootController extends PIXI.Container {
    private view: RootView;

    private obstaclesController: ObstaclesController;
    private obstaclesView: ObstaclesView;
    private birdController: BirdController;
    private birdView: BirdView;

    private ground: Ground;

    private gameSettings: GameSettings;
    private gameOver: boolean = false; // when set to true checkBirdCollision method will stop;

    constructor(view: RootView) {
        super();
        this.view = view;

        this.gameSettings = GameSettings.getInstance();

        this.addBackground();

        this.ground = new Ground();
        this.ground.y = this.gameSettings.gameHeight - this.ground.height;
        this.gameSettings.groundYPos = this.ground.y;

        this.birdView = new BirdView(this.gameSettings.birdStartingXPosition, this.gameSettings.birdStartingYPosition);
        this.birdController = new BirdController(this.birdView);

        document.addEventListener("keydown", (e: KeyboardEvent) => {
            this.onKeyDown(e);
        });
        (view as any).click = (view as any).touchstart = () => {
            this.mainAction();
        };

        this.obstaclesView = new ObstaclesView();
        this.obstaclesController = new ObstaclesController(this.obstaclesView);
        view.addChild(this.obstaclesView);

        view.addChild(this.ground);
        view.addChild(this.birdView);

        this.obstaclesController.startMoving();
        this.checkBirdCollision.bind(this)();
    }

    public addBackground(): any {
        const backgroundSprite = new PIXI.Sprite(PIXI.Texture.fromImage("background.png"));
        this.view.addChild(backgroundSprite);
    }

    private onKeyDown(key: KeyboardEvent) {
        if (key.keyCode == 32) {
            this.mainAction();
        }
    }

    private mainAction(): void {
        if (this.gameOver) this.restart();
        else this.birdController.fly();
    }

    private checkBirdCollision(): void {
        requestAnimationFrame(() => {
            if (!this.gameOver && !this.birdController.HasFallen) this.checkBirdCollision();
        });

        //pipe collision
        if (!this.birdController.IsHit) {
            if (
                CollisionChecker.pipeCollision(this.birdController.birdBody, this.obstaclesController.NextPipeObstacle)
            ) {
                this.birdHit();
            }
        }

        //groundHit
        if (CollisionChecker.groundCollision(this.birdController.birdBody, this.ground)) {
            this.gameOver = true;
            this.birdController.HasFallen = true;
            this.birdHit();
        }
    }

    private restart(): void {
        this.gameOver = false;

        this.ground.startMoving();
        this.birdController.resetBird();
        this.obstaclesController.resetObstacles();
        this.obstaclesController.startMoving();
        this.checkBirdCollision();
    }

    private birdHit(): void {
        this.birdController.IsHit = true;
        this.ground.stopMoving();
        this.obstaclesController.stopMoving();
    }
}
