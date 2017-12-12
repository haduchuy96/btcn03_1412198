const SetSquare = (i) => ({
    type: 'SET_SQUARE',
    action: {i}
});

const Sort = (isReverse) => ({
    type: 'SORT',
    action: {isReverse}
});


const JumpTo = (move)=> ({
    type: 'JUMPTO',
    action: {move}
});


const SetWin = ()=> ({
    type: 'SETWIN',
    action: {}
});





export default {SetSquare,Sort,JumpTo,SetWin}