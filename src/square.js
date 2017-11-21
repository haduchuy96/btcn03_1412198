import React from 'react';

class Square extends React.Component{
    render(){
        const squareClass = `square ${this.props.winner}`;
        if (this.props.value == "X"){
            return(
                <button className={squareClass} onClick={this.props.onClick}><font color="red">{this.props.value}</font></button>
            );
        }
        return(
            <button className={squareClass} onClick={this.props.onClick}><font color="blue">{this.props.value}</font></button>
        );

    }
}

export default Square;