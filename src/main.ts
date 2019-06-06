import * as PIXI from "pixi.js";
import screenfull from "screenfull";
// import { PixiConsole, PixiConsoleConfig } from "pixi-console";
import { GameController } from "./controllers/game-controller";
import { GameSettings } from "./models/game-settings";
import { GameView } from "./views/game-view";
import { GameModel } from "./models/game-model";

export class Main {
    private gameSettings: GameSettings = GameSettings.getInstance();
    private game: PIXI.Application;

    constructor() {
        window.onload = () => {
            this.createRenderer();
            // this.initConsole();
            this.startLoadingAssets();
        };
    }

    // private initConsole() {
    //     let consoleConfig = new PixiConsoleConfig();
    //     consoleConfig.consoleWidth = this.gameSettings.gameWidth;
    //     consoleConfig.consoleHeight = this.gameSettings.gameHeight;
    //     consoleConfig.consoleAlpha = 0.5;
    //     consoleConfig.fontSize = 10;

    //     new PixiConsole(consoleConfig);
    // }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("gameSprite", "assets/spritesData.json");
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        const gameModel = new GameModel();
        const gameView = new GameView(this.game.stage);
        const gameController = new GameController(gameModel, gameView);

        (window as any).flappyBird = { Main: this, GameController: gameController, GameView: gameView };
    }

    private createRenderer(): void {
        const gameContainer = document.getElementById("gameContainer");

        this.game = new PIXI.Application({
            backgroundColor: 0xffff00,
            height: window.innerHeight,
            width: window.innerWidth,
        });

        gameContainer.appendChild(this.game.view);

        this.game.stage.interactive = true;
        this.game.stage.scale.x = window.innerWidth / this.gameSettings.gameWidth;
        this.game.stage.scale.y = window.innerHeight / this.gameSettings.gameHeight;

        this.game.stage.interactive = true;
        this.game.stage.addListener("tap", () => {
            if (screenfull && screenfull.enabled) {
                screenfull.request(this.game.view);
            }
        });

        window.addEventListener("resize", () => {
            this.game.renderer.resize(window.innerWidth, window.innerHeight);
            this.game.stage.scale.x = window.innerWidth / this.gameSettings.gameWidth;
            this.game.stage.scale.y = window.innerHeight / this.gameSettings.gameHeight;
        });

        window.addEventListener("orientationchange", () => {
            this.game.renderer.resize(window.innerWidth, window.innerHeight);
            this.game.stage.scale.x = window.innerWidth / this.gameSettings.gameWidth;
            this.game.stage.scale.y = window.innerHeight / this.gameSettings.gameHeight;
        });
    }
}

(function() {
    const game: Main = new Main();
})();
