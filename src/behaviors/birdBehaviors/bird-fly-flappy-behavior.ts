import { IFlyBehavior } from "../../interfaces/behaviors/fly-behavior";
import { IGameObject } from "../../interfaces/game-object";
import { Howl } from "howler";

export class BirdFlyFlappyBehavior implements IFlyBehavior {
    private static readonly FLY_VELOCITY_Y: number = 2.5;

    public gameObject: IGameObject;

    private flySound: Howl;

    constructor(gameObject: IGameObject) {
        this.gameObject = gameObject;

        this.flySound = new Howl({
            src: ["../../../assets/sounds/sfx_wing.wav"],
        });
    }

    public fly(): void {
        if (this.gameObject.health === 0) {
            return ;
        }
        
        this.gameObject.velocityY = -BirdFlyFlappyBehavior.FLY_VELOCITY_Y;
        this.flySound.play();
    }

    dispose(): void {
        this.gameObject = null;
    }
}
