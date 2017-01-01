import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../styles/Board.scss';
// import Clock from './Clock';
import Announcement from './Announcement';
import Tile from './Tile';
import ResetButton from './ResetButton';

class Board extends Component {
  constructor() {
      super();
      this.state = {
        gameBoard: [
          ' ',' ',' ',
          ' ',' ',' ',
          ' ',' ',' '
        ],
        winner: null,
        turn: 'x',
        maxPlayer: 'x',
        minPlayer: 'o',
        gameOverMessage: 'Game over!'
      }
  }

  /**
   * @name resetBoard
   * @params 
   * @desc Reset the board
  */
  resetBoard() {
      this.setState({
        gameBoard: [
          ' ',' ',' ',
          ' ',' ',' ',
          ' ',' ',' '
        ],
        winner: null,
        turn: 'x',
        maxPlayer: 'x',
        minPlayer: 'o',
        gameOverMessage: 'Game over!'
      });
  }

  /**
   * @name winner
   * @params board {Object}
   * @params player {String}
   * @desc Test for winner
  */
  winner(board, player){
    if (
          (board[0] === player && board[1] === player && board[2] === player) ||
          (board[3] === player && board[4] === player && board[5] === player) ||
          (board[6] === player && board[7] === player && board[8] === player) ||
          (board[0] === player && board[3] === player && board[6] === player) ||
          (board[1] === player && board[4] === player && board[7] === player) ||
          (board[2] === player && board[5] === player && board[8] === player) ||
          (board[0] === player && board[4] === player && board[8] === player) ||
          (board[2] === player && board[4] === player && board[6] === player)
          ) {
          return true;
      } else {
          return false;
      }
  }

  /**
   * @name winner
   * @params board {Object}
   * @desc Test for Tie Game
  */
  tie(board) {
    var moves = board.join('').replace(/ /g, '');
    if (moves.length === 9) {
      return true;
    }
    return false;
  }

  isGameOver(board, player) {
    if (this.winner(board, player)) {
      this.setState({
        gameBoard: board,
        winner: player,
        gameOverMessage: player === 'x' ? 'You win!' : 'You lose!'
      });
      return;
    }
    if (this.tie(board)) {
      this.setState({
        gameBoard: board,
        winner: 'd'
      });
      return;
    }
  }

  /**
   * @name copyBoard
   * @params board {Object}
   * @desc Create a new version of the board to manipulate it
  */
  copyBoard(board) {
    return board.slice(0);
  }

  /**
   * @name validMove
   * @params move {}
   * @params player {String}
   * @params board {Object}
   * @desc Determine if a move is valid and return the new board state
  */
  validMove(move, player, board){
    var newBoard = this.copyBoard(board);
    if(newBoard[move] === ' '){
      newBoard[move] = player;
      return newBoard;
    } else
      return null;
  }

  findAiMove(board) {
    let bestMoveScore = 100;
    let move = null;
    //Test Every Possible Move if the game is not already over.
    if(this.winner(board, 'x') || this.winner(board, 'o' || this.tie(board))) {
      return null;
    }
    for(var i = 0; i < board.length; i++){
      let newBoard = this.validMove(i, this.state.minPlayer, board);
      //If validMove returned a valid game board
      if(newBoard) {
        //get maxScore
        var moveScore = this.miniMaxAlgorithm(newBoard, false, true);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }
    return move;
  }

  miniMaxAlgorithm(board, min, max) {
    if (this.winner(board, 'x')) {
      return 10;
    } else if (this.winner(board, 'o')) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      let bestMoveValue = max ? -100 : 100;
      let player = max ? this.state.maxPlayer : this.state.minPlayer;

      for (var i = 0; i < board.length; i++) {
        var newBoard = this.validMove(i, player, board);
        if (newBoard) {
          let predictedMoveValue = max ? this.miniMaxAlgorithm(newBoard, true, false) : this.miniMaxAlgorithm(newBoard, false, true);
          let condition = max ? predictedMoveValue > bestMoveValue : predictedMoveValue < bestMoveValue;

          if (condition)  {
            bestMoveValue = predictedMoveValue;
          }
        }
      }
      return bestMoveValue;
    }
  }

  gameLoop(move) {
    let player = this.state.turn;
    let currentGameBoard = this.validMove(move, player, this.state.gameBoard);

    this.isGameOver(currentGameBoard, player);

    player = 'o';
    currentGameBoard = this.validMove(this.findAiMove(currentGameBoard), player, currentGameBoard);

    this.isGameOver(currentGameBoard, player);

    this.setState({
        gameBoard: currentGameBoard
      });
  }

  // updateBoard(loc, player) {
  //   /**
  //   ** if the game is over show announcement
  //   **/
  //   if(this.state.winner !== null) {
  //     return;
  //   }

  //   /**
  //   ** Invalid move when the selected cell is not empty
  //   **/
  //   if(this.state.gameBoard[loc] === 'x' || this.state.gameBoard[loc] === 'o') {
  //     return;
  //   }

  //   let currentGameBoard = this.state.gameBoard;
  //   currentGameBoard.splice(loc, 1, this.state.turn);

  //   this.setState({gameBoard: currentGameBoard}, function() {
  //     /**
  //     ** If all cells are filled there is no winner and the game is over
  //     ** If there is empty cells check if there is a winner
  //     **/
  //     let moves = this.state.gameBoard.join('').replace(/ /g,'');

  //     if(moves.length === 9) {
  //       this.setState({winner: 'd'});
  //       return;
  //     } else {

  //       let topRow = this.state.gameBoard[0] + this.state.gameBoard[1] + this.state.gameBoard[2];
  //       let middleRow = this.state.gameBoard[3] + this.state.gameBoard[4] + this.state.gameBoard[5];
  //       let bottomRow = this.state.gameBoard[6] + this.state.gameBoard[7] + this.state.gameBoard[8];
  //       let leftCol = this.state.gameBoard[0] + this.state.gameBoard[3] + this.state.gameBoard[6];
  //       let middleCol = this.state.gameBoard[1] + this.state.gameBoard[4] + this.state.gameBoard[7];
  //       let rightCol = this.state.gameBoard[2] + this.state.gameBoard[5] + this.state.gameBoard[8];
  //       let leftDiag = this.state.gameBoard[0] + this.state.gameBoard[4] + this.state.gameBoard[8];
  //       let rightDiag = this.state.gameBoard[2] + this.state.gameBoard[4] + this.state.gameBoard[6];

  //       this.checkForWinner(topRow);
  //       this.checkForWinner(middleRow);
  //       this.checkForWinner(bottomRow);
  //       this.checkForWinner(leftCol);
  //       this.checkForWinner(middleCol);
  //       this.checkForWinner(rightCol);
  //       this.checkForWinner(leftDiag);
  //       this.checkForWinner(rightDiag);
  //       /**
  //       ** Change players` order
  //       **/
  //       this.setState({turn: (this.state.turn === 'x') ? 'o' : 'x' });
  //     }
  //   }, this);
  // }

  // checkForWinner(elements) {
  //   if(elements.match(/xxx|ooo/)){
  //     this.setState({winner: this.state.turn});
  //     return;
  //   }
  // }

  render() {
    return (
      <div className="App center">
          <div className="App__header">
            <img src={logo} className="App__logo" alt="logo" />
            <h1 className="App__title">Tic Tac Toe</h1>
          </div>
          <div className="App__content">
            <Announcement winner={this.state.winner} message={this.state.gameOverMessage} />
            <ResetButton reset={this.resetBoard.bind(this)}/>
            <div className="board__container">
              {this.state.gameBoard.map(function(value, i){
                return (
                  <Tile
                    key={i}
                    loc={i}
                    value={value}
                    gameLoop={this.gameLoop.bind(this)} />
                );
              }.bind(this))}
            </div>
          </div>
        </div>
    );
  }
}

export default Board;
