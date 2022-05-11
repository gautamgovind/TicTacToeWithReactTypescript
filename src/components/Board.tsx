import { useEffect, useState } from "react";
import Square from "./Square";


const Board = () =>{

    const [square, setSquare] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState(Math.round(Math.random()*1)===1 ? 'X': 'O')
    const [winner, setWinner] = useState<Player>(null);

    const setSquareValue = (index: number) =>{
        const newData = square.map((val,i)=>{
            if(index===i) {
                return currentPlayer;
            }
            return val;
        });
        setSquare(newData);
        setCurrentPlayer(currentPlayer=== 'X' ? 'O': 'X');
    }

    const reset = ()=>{
        setSquare(Array(9).fill(null));
        setWinner(null);
        setCurrentPlayer(Math.round(Math.random()*1)===1 ? 'X': 'O');
    }

    // Winner calculation logic:
    type Player = 'X' | 'O' | 'Tie' | null;
    const calculateWinner = (square:Player[])=>{
        const lines = [
            [0,1,2],
            [0,4,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [2,4,6],
            [3,4,5],
            [6,7,8]
        ];

        for(let i=0; i<lines.length; i++) {
            const [a,b,c] = lines[i];
            if(square[a] && square[a] === square[b] && square[a] === square[c]) {
                return square[a]
            }
        }
        return null;
    }

    useEffect(()=>{
        const gameEnd = calculateWinner(square);
        if(gameEnd){
            setWinner(gameEnd)
        }
        if(!gameEnd && !square.filter((item)=>!item?.length)) {
            setWinner("Tie")
        }
    });

    return(
        <>
        {!winner && <p>Player-{currentPlayer} It's your turn:</p>}
        {winner && winner!=='Tie' && <p>COngratulation Player {winner}</p>}
        {winner && winner==='Tie' && <p>No one won!!</p>}

        <div className="grid">
            {Array(9).fill(null).map((_,i)=>{
                return(
                    <Square 
                        key={i}
                        winner={winner}
                        onClick={()=> setSquareValue(i)}
                        value={square[i]}
                    />
                )
            })}
        </div>
        <button className="reset" onClick={reset}>Reset</button>
        </>
    )
}

export default Board;