import { IFlyBehavior } from "../interfaces/behaviors/fly-behavior";
import { GameObject } from "../interfaces/game-object";

export class BirdFlyFlappyBehavior implements IFlyBehavior {
    private static readonly FLY_VELOCITY_Y: number = 2.5;

    public gameObject: GameObject;

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject;
    }

    public fly(): void {
        this.gameObject.velocityY = -BirdFlyFlappyBehavior.FLY_VELOCITY_Y;
    }

    dispose(): void {
        this.gameObject = null;
    }
}
