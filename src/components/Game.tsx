import React from "react";
import '../index.css';
import Board from "./Board";


const Game = ()=>{
    return(
        <div>
            <div className="board-row">
                <Board />
            </div>
        </div>
    )
}

export default Game;