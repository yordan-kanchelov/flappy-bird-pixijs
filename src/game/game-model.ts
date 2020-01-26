export class GameModel {
    public gameOver: boolean;

    private _gameScore: number;

    /**
     *
     */
    constructor() {
        this.gameOver = false;
        this._gameScore = 0;
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
        this.gameOver = false;
        this._gameScore = 0;
    }
}
