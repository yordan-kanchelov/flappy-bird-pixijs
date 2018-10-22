import { IFlyBehavior } from "../interfaces/behaviors/fly-behavior";
import { IGameObject } from "../interfaces/game-object";

export class BirdFlyFlappyBehavior implements IFlyBehavior {
    private static readonly FLY_VELOCITY_Y: number = 2.5;

    public gameObject: IGameObject;

    constructor(gameObject: IGameObject) {
        this.gameObject = gameObject;
    }

    public fly(): void {
        if (this.gameObject.health !== 0) {
            this.gameObject.velocityY = -BirdFlyFlappyBehavior.FLY_VELOCITY_Y;
        }
    }

    dispose(): void {
        this.gameObject = null;
    }
}
