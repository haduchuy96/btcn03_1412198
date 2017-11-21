import React from 'react';
import Board from './board';

function kt_Doc(a,b,arr)
{
    var count = 1;
    var x = a + 1;
    var tmp =[];
    tmp.push(a*20+b)
    while (x < 20 && arr[a][b] == arr[x][b])
    {
        count++;
        tmp.push(x*20+b);
        x++;
    }
    x = a - 1;
    while (x >= 0 && arr[a][b] == arr[x][b])
    {
        count++;
        tmp.push(x*20+b);
        x--;
    }

    if (count==5){
        return {
            kt: true,
            arr: tmp
        }
    }

    return {
        kt: false,
        arr: tmp
    }
}

function kt_Ngang(a,b,arr)
{
    var count = 1;
    var  y = b + 1;
    var tmp =[];
    tmp.push(a*20+b)
    while (y < 20 && arr[a][b] == arr[a][y])
    {
        count++;
        tmp.push(a*20+y);
        y++;
    }
    y = b - 1;
    while (y >= 0 && arr[a][b] == arr[a][y])
    {
        count++;
        tmp.push(a*20+y);
        y--;
    }
    if (count==5){
        return {
            kt: true,
            arr: tmp
        }
    }

    return {
        kt: false,
        arr: tmp
    }

}


function kt_Cheo(a,b,arr)
{
    var count = 1;
    var  x = a + 1;
    var y = b + 1;
    var tmp =[];
    tmp.push(a*20 + b);
    while (x < 20 && y < 20 && arr[a][b] == arr[x][y])
    {
        count = count + 1;
        tmp.push(x*20 + y);
        x++;
        y++;
    }
    x = a - 1;
    y = b - 1;
    while (x >= 0 && y >= 0 && arr[a][b] == arr[x][y])
    {
        count = count + 1;
        tmp.push(x*20 + y);
        x--;
        y--;
    }

    if (count==5){
        return {
            kt: true,
            arr: tmp
        }
    }

    return {
        kt: false,
        arr: tmp
    }
}
function kt_CheoPhu(a,b,arr)
{
    var count = 1;
    var x = a + 1;
    var y = b - 1;
    var tmp =[];
    tmp.push(a*20 + b);
    while (x < 20 && y >= 0 && arr[a][b] == arr[x][y])
    {
        count++;
        tmp.push(x*20 + y);
        x++;
        y--;
    }
    x = a - 1;
    y = b + 1;
    while (x >= 0 && y < 20 && arr[a][b] == arr[x][y])
    {
        count++;
        tmp.push(x*20 + y);
        x--;
        y++;
    }

    if (count==5){
        return {
            kt: true,
            arr: tmp
        }
    }

    return {
        kt: false,
        arr: tmp
    }
}
function Total_Check(x,y,arr)
{

    if (kt_Ngang(x, y,arr).kt == true)

        return {
            kt:true,
            arr : kt_Ngang(x, y,arr).arr
        };
    if ( kt_Doc(x, y,arr).kt == true )
        return {
            kt:true,
            arr : kt_Doc(x, y,arr).arr
        };
    if (kt_Cheo(x, y,arr).kt == true )
        return {
            kt:true,
            arr : kt_Cheo(x, y,arr).arr
        };
    if (kt_CheoPhu(x, y,arr).kt)
        return {
            kt:true,
            arr : kt_CheoPhu(x, y,arr).arr
        };

    return {
        kt: false,
        arr :[]
    };
}

function calculateWinner(squares,x,y) {

    var tmparr =[] ;
    var arr = [];
    for(var i=0;i<squares.length;i++){
        if((i)%20 == 0&& i!=0){
            arr.push(tmparr);
            tmparr = [];
        }
        tmparr.push(squares[i]);
    }
    arr.push(tmparr);

    var tmp = Total_Check(x,y,arr);
    if( tmp.kt == true)
    {

        return {
            winnerLocation: tmp.arr,
            winnerPlayer: arr[x][y]
        };
    }






    return null;
}
class Game extends React.Component{
    constructor(){
        super();
        this.state = {
            history: [{
                squares: Array(400).fill(null),
                moveLocation: '',
            }],
            xIsNext: true,
            stepNumber: 0,
            isReverse: false,

        };
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }

        const matrixSize = Math.sqrt(history[0].squares.length);

        const moveLocation = [Math.floor(i / matrixSize) + 1, (i % matrixSize) + 1].join(", "); //
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                moveLocation: moveLocation,
                x:(Math.floor(i / matrixSize) + 1) -1,
                y:([Math.floor((i % matrixSize) + 1)][0])-1,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    changeReverse(isReverse){
        this.setState({
            isReverse: !isReverse
        });
    }

    jumpTo(move){

        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) ? false : true,
        });

    }


    render(){

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares;

        var  tmpstepx;
        var  tmpstepy;
        const moves = history.map((step, move) => {
            const description = move ? `Move #${move} (${step.moveLocation})` : 'Game start';
            tmpstepx = step.x;
            tmpstepy = step.y;
            return <li key={move}><a href="#" onClick={() => this.jumpTo(move)}>{description}</a></li>
        });
        const winner = calculateWinner(squares,tmpstepx,tmpstepy);
        const isReverse = this.state.isReverse;
        let status;
        if(winner){
            status = "Winner is: " + winner.winnerPlayer;
        }else if(this.state.stepNumber === 400){
            status = "No one win";
        }else{
            status = "Next player is: " + (this.state.xIsNext ? 'X' : 'O');
        }
        return(
            <div className="container">

                    <div className="game-info">
                        <p>{status}</p>
                        <p><b>History</b></p>
                        <ol reversed={isReverse ? 'reverse' :''}>{isReverse ? moves.reverse() : moves}</ol>
                        <button onClick={() => this.changeReverse(isReverse)}>Sort</button>
                    </div>

                <div className="game">
                    <Board squares={squares} onClick={i => this.handleClick(i)} winner={winner && winner.winnerLocation}/>
                </div>



            </div>
        );
    }
}

export default Game;