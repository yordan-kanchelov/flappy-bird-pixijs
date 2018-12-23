import { IFlyBehavior } from "../../interfaces/behaviors/fly-behavior";
import { IGameObject } from "../../interfaces/game-object";
import { Howl } from "howler";

export class BirdFlyFlappyBehavior implements IFlyBehavior {
    private static readonly FLY_VELOCITY_Y: number = 2.43;

    public gameObject: IGameObject;

    private flySound: Howl;
    private whoopingFlySound: Howl;

    constructor(gameObject: IGameObject) {
        this.gameObject = gameObject;

        this.flySound = new Howl({
            src: ["../../../assets/sounds/sfx_wing.wav"],
        });

        this.whoopingFlySound = new Howl({
            src: ["../../../assets/sounds/sfx_swooshing.wav"],
        });
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
