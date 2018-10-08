export class GameSettings {
    //game resolution
    public gameWidth: number = 144;
    public gameHeight: number = 256;

    //bird settings
    public birdStartingXPosition: number = this.gameWidth / 3;
    public birdStartingYPosition: number = this.gameHeight / 5;
    public birdStartingVelocity: number = -2;

    //obstacles settings
    public pipeObstaclesGap: number = 45;
    public obstaclesDistance: number = 45;
    public obstaclesSpeed: number = 1;

    // customization
    public groundMoveSpeed: number = 2;

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
