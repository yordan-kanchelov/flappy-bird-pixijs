import { Ground } from "../game-objects/ground";
import { PipeObsticle } from "../game-objects/pipes-obsticle";

export class CollisionChecker {
    public static pipeCollision(bird: PIXI.Sprite, pipeObsticle: PipeObsticle): boolean {
        const birdBottomPoint: number = bird.y + bird.texture.height;

        const xCollision: boolean =
            bird.x < pipeObsticle.x + pipeObsticle.UpperPipe.width && bird.x + bird.width / 2 > pipeObsticle.x;

        const yCollision: boolean =
            (bird.y - bird.height / 2 < pipeObsticle.UpperPipe.y + pipeObsticle.UpperPipe.height &&
                bird.height / 2 + bird.y > pipeObsticle.UpperPipe.y) ||
            (bird.y - bird.height / 2 < pipeObsticle.BottomPipe.y + pipeObsticle.BottomPipe.height &&
                bird.height / 2 + bird.y > pipeObsticle.BottomPipe.y) ||
            birdBottomPoint < 0; // when bird height is out of screen

        if (yCollision && xCollision) {
            return true;
        }

        return false;
    }

    public static groundCollision(bird: PIXI.Sprite, ground: Ground): boolean {
        if (Math.round(bird.y) >= ground.y) {
            return true;
        } else {
            return false;
        }
    }
}
