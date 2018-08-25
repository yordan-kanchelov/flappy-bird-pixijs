import { IGravityBehavior } from "./gravity-behavior";

export interface IFlyBehavior {
    gravityBehavior: IGravityBehavior;

    fly(): void;
    dispose(): void;
}
