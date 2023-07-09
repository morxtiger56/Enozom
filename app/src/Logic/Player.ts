
export default class Player{
    private currentPosition: number = 0;
    private isActive: boolean = false;

    private rollDice(): number {
        return Math.floor(Math.random() * 6) + 1;
    }

    public move(position: number): void {
        const number = this.rollDice();
        console.log(number);
    }

    public toggleState(newState: boolean): void {
        // Implement the toggleState method logic
    }
}

