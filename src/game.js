import React from 'react';
import Board from './board';
import  Utils from  './utils'
import { connect } from 'react-redux'
import Action from './action'


class Game extends React.Component{

    onClick(isReverse) {
        let {dispatch} = this.props;
        dispatch(Action.Sort(isReverse));
    }

    jumpTo(move) {
        let {dispatch} = this.props;
        dispatch(Action.JumpTo(move));
    }

    setWin() {
        let {dispatch} = this.props;
        dispatch(Action.SetWin());
    }


    render(){

        const stepNumber = this.props.stepNumber;
        const current = this.props.history[stepNumber];
        const squares = current.squares;

        var  tmpstepx;
        var  tmpstepy;


        const moves = this.props.history.map((step, move) => {
            const description = move ? `Move #${move} (${step.moveLocation})` : 'Game start';
            tmpstepx = step.x;
            tmpstepy = step.y;
            return <li key={move}><a href="#" onClick={() => this.jumpTo(move)}>{description}</a></li>
        });


        const winner = Utils.calculateWinner(squares,tmpstepx,tmpstepy);


        const isReverse = this.props.isReverse;
        let status;
        if(winner){
            this.setWin();
            status = "Winner is: " + winner.winnerPlayer;
        }else if(this.props.stepNumber === 400){
            status = "No one win";
        }else{
            status = "Next player is: " + (this.props.xIsNext ? 'X' : 'O');
        }
        return(

                <div className="container">

                      <div className="game-info">
                            <p>{status}</p>
                            <p><b>History</b></p>
                            <ol reversed={isReverse ? 'reverse' :''}>{isReverse ? moves.reverse() : moves}</ol>
                            <button onClick={() => this.onClick(isReverse)}>Sort</button>
                        </div>

                    <div className="game">
                        <Board
                            squares={squares}
                            onClick={i => this.handleClick(i)}
                            winner={winner && winner.winnerLocation}/>
                    </div>



                </div>









        );
    }
}

Game = connect(function (state) {
    return {...state}
})(Game);

export default Game;