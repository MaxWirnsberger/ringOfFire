export interface GameFace {
    id?: string;
    currentPlayer: number;
    playedCard:string[];
    players:string[];
    stack: string[];
}