import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/* class Square extends React.Component // square component renders a single <button> and 
// {
//   // no constructor needed because square does not keep track of game state

//     render() 
//     { // the prop value passed in through Board.renderSquare
//       return (
//         <button 
//         className="square" 
//         onClick={() => this.props.onClick({value: 'X'})}> 
//           {this.props.value} 
//         </button>
//       ); // () =>passing a function as the onClick prop, only calls when there is a click
//     }
//   } */

function Square(props)
{
  return (
        <button 
        className="square" 
        onClick={props.onClick}> 
          {props.value} 
        </button>
        ); // () =>passing a function as the onClick prop, only calls when there is a click
}
  
  class Board extends React.Component // board component renders 9 squares
  { 
    constructor(props) 
    {
      super(props);
      this.state = { 
        squares: Array(9).fill(null),
        xIsNext: true,
      }; // initial state of the board: squares are null, x always starts first
      
    }
    handleClick(i) // the square calls the Board.handleClick when it is clicked.
    { // the state is stored in the board component instead of the individual squares
      const squares = 
      this.state.squares.slice(); // slice makes it immutable: easier to time travel
        squares[i] = this.state.xIsNext ? 'X' : 'O'; // each time a player moves, xIsNext will be flipped to determine X's or O's
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        
        });
        // '.slice()' creates a copy of the squares array to modify instead of modifying the existing array
    }
    renderSquare(i) // passing down value and onClick props from Board to Square
    {
      return <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)} />; // pass a prop called value to the square
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component // game component renders a board with placeholder values
  {
    render() 
    {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  