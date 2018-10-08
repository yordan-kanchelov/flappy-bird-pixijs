export interface GameObject extends PIXI.Container {
    body: PIXI.Sprite;
    health: number;
    velocityX: number;
    velocityY: number;
}
