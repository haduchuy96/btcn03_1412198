import React from 'react';
import Square from './square';
import { connect } from 'react-redux'
import Action from './action'
class Board extends React.Component{


    renderSquare(i){
        const winner = this.props.winner;
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.onClick(i)}
            winner={winner && winner.includes(i) ? 'winner' : ''}
        />
    }

    onClick(i) {
        if(this.props.canPlay == true){
            const matrixSize = Math.sqrt(this.props.squares.length);


            const x = (Math.floor(i / matrixSize) + 1) -1;
            const y = ([Math.floor((i % matrixSize) + 1)][0])-1;

            var kt = true
            for(var k = 0; k < this.props.history.length;k++)
            {
                if(this.props.history[k].x == x && this.props.history[k].y==y){
                    kt = false
                }
            }
{
            }

            if(kt){
                let {dispatch} = this.props;
                dispatch(Action.SetSquare(i));
            }


        }
    }

    render(){


        const matrixSize = Math.sqrt(this.props.squares.length);
        const rows = Array(matrixSize).fill(null);
        const cols = rows;
        const board = rows.map((row, i) => {
            const squares = cols.map((col, j) => {
                const squareKey = i * matrixSize + j;
                return <span key={squareKey}>{this.renderSquare(squareKey)}</span>;
            });
            return <div className="board-row" key={i}>{squares}</div>
        });
        return(
            <div>
                <div>{board}</div>
            </div>
        );
    }
}
Board = connect(function (state) {
    return {...state}
})(Board);

export default Board;