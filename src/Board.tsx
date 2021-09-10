import React, { useEffect, useState } from "react";
import Background from "./background";
import SquareIcon from "./square-icon";
import { Game, Score, Symbols } from "./type";

const combinationCollection = [
    // horizontal
    ['0,0', '0,1', '0,2'],
    ['1,0', '1,1', '1,2'],
    ['2,0', '2,1', '2,2'],
    // vertical
    ['0,0', '1,0', '2,0'],
    ['0,1', '1,1', '2,1'],
    ['0,2', '1,2', '2,2'],
    // diagonal
    ['0,0', '1,1', '2,2'],
    ['0,2', '1,1', '2,0'],
];

export const Board: React.FC = () => {
    const [square, setSquare] = useState<[Symbols, Symbols, Symbols][]>([]);
    const [score, setScore] = useState<Score>({ X: 0, O: 0 });
    const [game, setGame] = useState<Game>({
        move: 0,
        turn: undefined,
        winer: null
    });
    const gameState = () => { return (game.winer !== null || game.move >= 9) ? 'stop' : 'playing' }

    useEffect(() => {
        clearBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reset = () => {
        clearBoard();
        setScore({ X: 0, O: 0 });
    }

    const clearBoard = () => {
        setSquare([[undefined, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]);
        setGame({
            move: 0,
            turn: 'X',
            winer: null
        });
    }

    const handleMove = (point: [number, number]) => {
        const currentSquare = square;
        currentSquare[point[0]][point[1]] = game.turn;
        
        setSquare(currentSquare);
        setGame({
            ...game,
            move: game.move + 1,
            turn: game.turn === 'X' ? 'O' : 'X'
        });
      }

    useEffect(() => {
        if(game.turn !== undefined){        
            const collections = combinationCollection.map(combinations => {
                return combinations.map(combination => {
                    const [row, col] = combination.split(',');
                    return square[+row][+col];
                })
            });
            
            const combination = collections.map(collection => {
                if(!collection.includes(undefined))
                    return new Set(collection).size === 1 ? collection[0] : undefined;
                return undefined;
            });
            
            const winer:Symbols = combination.includes('X') ? 'X' : (combination.includes('O') ? 'O' : undefined);
            if(winer) {
                setGame({
                    ...game,
                    winer: {
                        player: winer,
                        winLine: combination.indexOf(winer) + 1
                    }
                });

                const currentScore = score;
                currentScore[winer]++;
                setScore({
                    ...currentScore
                });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.turn]);

  return (
    <div className="game">
        <div className="score">
            <div className={`player ${(game.turn === 'X' && !game.winer) || game.winer?.player === 'X' ? 'active' : ''}`}>
                <SquareIcon symbol="X" />
                <span className="value">{score.X}</span>
            </div>
            <div className={`player ${(game.turn === 'O' && !game.winer) || game.winer?.player === 'O' ? 'active' : ''}`}>
                <SquareIcon symbol="O" />
                <span className="value">{score.O}</span>
            </div>
        </div>
        <div className="status">
            {(gameState() === 'playing') ?
                <span><SquareIcon symbol={game.turn} /> Turn</span>
            : (game.winer ? 
                    <span><SquareIcon symbol={game.winer.player} /> is Win!</span>
                :
                    <span>Game Over!</span>
            )}
        </div>
        <div className="board">
            <Background winer={game.winer} />
            <table>
                {square.map((row, rowIndex) => 
                    <tr key={rowIndex}>
                        {row.map((column, columnIndex) =>
                            <td key={columnIndex}>
                                <button
                                    onClick={() => handleMove([rowIndex, columnIndex])}
                                    disabled={(column !== undefined) || (gameState() === 'stop')}                
                                    className="square">
                                    {column && <SquareIcon symbol={column} stroke="custom" />}
                                </button>
                            </td>
                        )}
                    </tr>
                )}
            </table>
        </div>
        <div className="action">
            <button className="reset" onClick={() => reset()}>reset</button>
            {(gameState() === 'stop') && <button className="continue" onClick={() => clearBoard()}>continue</button>}
        </div>
    </div>
  );
};

export default Board;
