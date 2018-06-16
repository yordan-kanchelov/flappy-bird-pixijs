import { IFlyBehavior } from "./fly-behavior";
import { IGravityBehavior } from "./gravity-behavior";

export class BirdFlyFlappyBehavior implements IFlyBehavior {
    private static readonly FLY_VELOCITY_Y: number = 2.5;

    public gravityBehavior: IGravityBehavior;

    constructor(gravityBehavior: IGravityBehavior) {
        this.gravityBehavior = gravityBehavior;
    }

    public fly(): void {
        if (!this.gravityBehavior.isHitted) {
            this.gravityBehavior.velocityY = -BirdFlyFlappyBehavior.FLY_VELOCITY_Y;
        }
    }

    public dispose(): void { this.gravityBehavior = null; }
}
