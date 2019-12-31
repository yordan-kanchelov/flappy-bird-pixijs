export class GameModel {
    public gameOver: boolean;

    private _gameScore: number;

    /**
     *
     */
    constructor() {
        this.initPropsWithDefaultValues();
    }

    public get gameScore(): number {
        return this._gameScore;
    }

    incrementScore(incValue: number) {
        this._gameScore += incValue;
    }

    decrementScore(decValue: number) {
        this._gameScore = this.gameScore <= decValue ? 0 : this.gameScore - decValue;
    }

    resetModel() {
        this.initPropsWithDefaultValues();
    }

    private initPropsWithDefaultValues(): any {
        this.gameOver = false;
        this._gameScore = 0;
    }
}
