import * as PIXI from "pixi.js";
import { RootController } from "./controllers/root-controller";
import { GameSettings } from "./models/game-setttings";
import { RootView } from "./views/root-view";

export class Main {
    private gameSettings: GameSettings = GameSettings.getInstance();
    private game: PIXI.Application;

    constructor() {
        window.onload = () => {
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = PIXI.loader;
        loader.add("gameSprite", "assets/spritesData.json");
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createrenderer();

        const rootView = new RootView(this.game.stage);
        const rootController = new RootController(rootView);

        this.animate();
    }

    private createrenderer(): void {
        this.game = new PIXI.Application({
            backgroundColor: 0xffff00,
            height: window.innerHeight,
            width: window.innerWidth,
        });

        this.game.stage.scale.x = window.innerWidth / this.gameSettings.gameWidth;
        this.game.stage.scale.y = window.innerHeight / this.gameSettings.gameHeight;
        this.game.stage.interactive = true;

        document.body.appendChild(this.game.view);

        this.animate();
    }

    private animate(): void {
        requestAnimationFrame(() => {
            this.animate();
        });

        this.game.renderer.render(this.game.stage);
    }
}

(function () {
    const game: Main = new Main();
})();
