
export type Symbols = 'X' | 'O' | undefined;

export type Score = { [key in Symbols]: number };

export type Winer = {
    player: Symbols;
    winLine: number | undefined;
} | null;

export interface Game {
    move: number;
    turn: Symbols;
    winer: Winer;
}