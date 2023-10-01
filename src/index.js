import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function Square(props) // function method: simplier than component class (only contains render method) and easier to implement. 
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
    // deleted constructor because Game board now takes charge
    // handleClick now a method in Game comp
    renderSquare(i) // passing down value and onClick props from Board to Square
    {
      return (
      <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} 
      />); // pass a prop called value to the square
    }
  
    render() 
    {
      // const status = 'Next player: X';
  
      return (
        <div>
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
    constructor(props) // lifting the board state up to the game. Game comp has full control over Board's data, including history
    {
      super(props);
      this.state = {
        history: [{
          square: Array(9).fill(null)
        }],
        xIsNext: true
      };
    }

    handleClick(i)
    {
      const history = this.state.history;
      const current = history[history.length-1];
      const squares = current.squares.slice();

      if (calculateWinner(squares) || squares[i]) // what this mean?
      {
        return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
      });
    }

    render() // use most recent history entry to determine display and game status
    {
      const history = this.state.history;
      const current = history[history.length-1]; // most current history in the array
      const winner = calculateWinner(current.squares);

      let status;
      if (winner)
      {
        status = 'Winner: ' + winner;
      }
      else
      {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            
            />
          </div>
          <div className="game-info">
            <div>{status}</div> 
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      ); // Game comp is now rendering the game's status
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
  function calculateWinner(squares)
  {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]; // winning lines

    for (let i = 0; i < lines.length; i++)
    {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      {
        return squares[a]; // returns 'X' or 'O' winner
      }
    }
    return null; // no winner returns 'null'
  }