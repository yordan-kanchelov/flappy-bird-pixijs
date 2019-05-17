import * as PIXI from "pixi.js";

export interface IGameObject extends PIXI.Container {
    body: PIXI.Sprite;
    health: number;
    velocityX: number;
    velocityY: number;
    gravityPower: number;
}
