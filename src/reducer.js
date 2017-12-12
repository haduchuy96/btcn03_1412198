import  Utils from  './utils'
let default_rows = 13;
let default_cols = 29;
let squares = new Array(default_rows).fill(null);
for (let i = 0; i < default_rows; i++) {
    squares[i] = new Array(default_cols).fill(null);
}

let default_state = {
    history: [{
        squares: Array(400).fill(null),
        moveLocation: '',
    }],
    xIsNext: true,
    stepNumber: 0,
    isReverse: false,
    canPlay: true,
};

export default (state = default_state, action) => {
    switch (action.type) {
        case 'SET_SQUARE':

            let i = action.action.i;


            const history = state.history.slice(0,state.stepNumber + 1);

            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if(Utils.calculateWinner(squares) || squares[i]) {
                return;
            }

            const matrixSize = Math.sqrt(history[0].squares.length);


            const moveLocation = [Math.floor(i / matrixSize) + 1, (i % matrixSize) + 1].join(", "); //
            squares[i] = state.xIsNext ? 'X' : 'O';



            let res = {
                ...state,
                history: history.concat([{
                    squares: squares,
                    moveLocation: moveLocation,
                    x:(Math.floor(i / matrixSize) + 1) -1,
                    y:([Math.floor((i % matrixSize) + 1)][0])-1,
                }]),
                xIsNext: !state.xIsNext,
                stepNumber: history.length
            }


            return res;

        case "SORT":
            let isReverse = action.action.isReverse;

            let res2 = {
                ...state,
                isReverse: !isReverse
            }

            return res2;

        case "JUMPTO":

            let move = action.action.move;

            let res3 = {
                ...state,
                stepNumber: move,
                canPlay : true,
                xIsNext: (move % 2) ? false : true,
            }
            return res3;

        case "SETWIN":

            let res4 = {
                ...state,
                canPlay : false,

            }
            return res4;
        default:
            return state
    }
}