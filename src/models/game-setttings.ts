export class GameSettings {
    //game resolution
    public gameWidth: number = 144;
    public gameHeight: number = 256;

    //bird settings
    public birdStartingXPossition: number = this.gameWidth / 3;
    public birdStartingYPossition: number = this.gameHeight / 5;
    public birdStartingVelocity: number = -2;

    //obsticles settings
    public pipeObsticlesGap: number = 45;
    public obsticlesDistance: number = 45;
    public obsticlesSpeed: number = 1;

    public groundYPos: number = 0;

    private static instance: GameSettings = new GameSettings();

    constructor() {
        if (GameSettings.instance) {
            throw new Error("Error: Instantiation failed: Use GameSettings.getInstance() instead of new.");
        }
        GameSettings.instance = this;
    }

    public static getInstance(): GameSettings {
        return GameSettings.instance;
    }
}
