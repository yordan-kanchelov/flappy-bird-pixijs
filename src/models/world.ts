import { Ground } from "../game-objects/ground";
import { IGameObject } from "../interfaces/game-object";

export class World {
    private static instance: World = new World();

    stage: PIXI.Container;
    ground: Ground;

    constructor() {
        if (World.instance) {
            throw new Error("Error: Instantiation failed: Use World.getInstance() instead of new.");
        }

        World.instance = this;
    }

    public static getInstance(): World {
        return World.instance;
    }

    public static isObjectOnGround(gameObject: IGameObject) {
        if (gameObject.y >= World.getInstance().ground.y) {
            return true;
        }

        return false;
    }
}
