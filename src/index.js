import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Home from './pages/Home/Home'

//将Square类替换成下面的函数
function Square(props){
  return (
    <button 
    className="square" 
    onClick={props.onClick}>
      {props.value}
    </button>
  )
}

//棋盘
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true, //决定玩家顺序
    };
  }

  //定义
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O'; //为什么const可以改动？深浅拷贝？
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    console.log(squares);//延迟改动？打印数组的
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = '下一位玩家: ' + (this.state.xIsNext ? 'X' : 'O'); //？括号可以表达式输出

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

class Game extends React.Component {
  render() {
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

ReactDOM.render(
  <Game />,
  <Home />,
  document.getElementById('root')
);


//serviceWorker.unregister();
