import getHowlSound from "../../../utils/getHowlerSound";
import { FlyBehavior } from "../../abstract/behaviors/fly-behavior";
import { GameObject } from "../../abstract/game-object";

export class BirdFlyFlappyBehavior implements FlyBehavior {
    private static readonly FLY_VELOCITY_Y: number = 2.43;

    public gameObject: GameObject;

    private flySound: Howl;
    private whoopingFlySound: Howl;

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject;

        this.flySound = getHowlSound("sfx_wing.wav");
        this.whoopingFlySound = getHowlSound("sfx_swooshing.wav");
    }

    public fly(): void {
        if (this.gameObject.health === 0) {
            return;
        }

        if (this.gameObject.velocityY >= 4) {
            this.whoopingFlySound.play();
        } else {
            this.flySound.play();
        }

        this.gameObject.velocityY = -BirdFlyFlappyBehavior.FLY_VELOCITY_Y;
    }

    dispose(): void {
        this.gameObject = null;
    }
}
