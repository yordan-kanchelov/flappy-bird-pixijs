import { Ground } from "../game-objects/ground";
import { IGameObject } from "../interfaces/game-object";

export class World {
    private static instance: World = new World();

    stage: PIXI.Container;
    ground: Ground;
    gameObjects: IGameObject[];
    
    private background: PIXI.Sprite;

    constructor() {
        if (World.instance) {
            throw new Error("Error: Instantiation failed: Use World.getInstance() instead of new.");
        }

        World.instance = this;

        this.gameObjects = [];
    }
    

    public static getInstance(): World {
        return World.instance;
    }

    public static setBackground(backgroundTexture: PIXI.Texture): any {
        if(!this.WorldInstance.background){
            this.WorldInstance.background = new PIXI.Sprite(backgroundTexture);
            this.WorldInstance.stage.addChildAt(this.WorldInstance.background, 0);
        } else {
            this.WorldInstance.background.texture = backgroundTexture;
        }
    }

    public static isObjectOnGround(gameObject: IGameObject) {
        if (gameObject.y >= World.getInstance().ground.y) {
            return true;
        }

        return false;
    }

    public static addObjectToWorld(gameObject: IGameObject) {
        this.WorldInstance.gameObjects.push(gameObject);
        this.WorldInstance.stage.addChild(gameObject);
    }

    private static get WorldInstance() { 
        return World.getInstance();
    }
}
