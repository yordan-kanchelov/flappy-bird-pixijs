import { Ground } from "../game-objects/ground";
import { PipeObstacle } from "../game-objects/pipes-obstacle";

export class CollisionChecker {
    public static pipeCollision(bird: PIXI.Sprite, pipeObstacle: PipeObstacle): boolean {
        const birdBottomPoint: number = bird.y + bird.texture.height;

        const xCollision: boolean =
            bird.x < pipeObstacle.x + pipeObstacle.UpperPipe.width && bird.x + bird.width / 2 > pipeObstacle.x;

        const yCollision: boolean =
            (bird.y - bird.height / 2 < pipeObstacle.UpperPipe.y + pipeObstacle.UpperPipe.height &&
                bird.height / 2 + bird.y > pipeObstacle.UpperPipe.y) ||
            (bird.y - bird.height / 2 < pipeObstacle.BottomPipe.y + pipeObstacle.BottomPipe.height &&
                bird.height / 2 + bird.y > pipeObstacle.BottomPipe.y) ||
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
