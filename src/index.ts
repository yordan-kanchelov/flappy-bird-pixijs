import * as PIXI from "pixi.js";
import * as screenfull from "screenfull";

import { GameController } from "./game/game-controller";
import { GameSettings } from "./game/game-settings";
import { GameView } from "./game/game-view";
import { GameModel } from "./game/game-model";

export class Main {
    private gameSettings: GameSettings = GameSettings.getInstance();
    private game: PIXI.Application;

    constructor() {
        window.onload = () => {
            this.createRenderer();
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("gameSprite", "./spritesData.json");
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        const gameModel = new GameModel();
        const gameView = new GameView(this.game.stage);
        const gameController = new GameController(gameModel, gameView);

        (window as any).flappyBird = { PIXI: PIXI, Main: this, GameController: gameController, GameView: gameView };
    }

    private createRenderer(): void {
        const gameContainer = document.getElementById("gameContainer");

        this.game = new PIXI.Application({
            backgroundColor: 0xff0000,
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
