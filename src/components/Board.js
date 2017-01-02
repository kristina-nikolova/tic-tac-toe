import React, { Component } from 'react';
import '../styles/components/Board.scss';
import Tile from './Tile';
import ResetButton from './ResetButton';

class Board extends Component {
  /**
   * @props gameOverHandler()
   * @props resetGameHandler()
   */
  constructor(props) {
      super(props);
      this.state = {
        gameBoard: [
          ' ',' ',' ',
          ' ',' ',' ',
          ' ',' ',' '
        ],
        winner: null,
        currentPlayer: 'x',
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
        currentPlayer: 'x',
        maxPlayer: 'x',
        minPlayer: 'o',
        gameOverMessage: 'Game over!'
      }, function(){
        this.props.resetGameHandler(this.state.winner, this.state.gameOverMessage);
      });
  }

  /**
   * @name winner
   * @params board {Object}
   * @params player {String}
   * @desc Check for winner
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
   * @name tie
   * @params board {Object}
   * @desc Check for Tie Game
  */
  tie(board) {
    var moves = board.join('').replace(/ /g, '');
    if (moves.length === 9) {
      return true;
    }
    return false;
  }

  /**
   * @name isGameOver
   * @params board {Object}
   * @params player {String}
   * @desc Check if game is over
  */
  isGameOver(board, player) {
    if (this.winner(board, player)) {
      this.setState({
        gameBoard: board,
        winner: player,
        gameOverMessage: player === 'x' ? 'You win!' : 'You lose!'
      }, function() {
        /**
        ** Update winner and message in the parent state
        **/
        this.props.gameOverHandler(this.state.winner, this.state.gameOverMessage);
      });

      return;
    }
    if (this.tie(board)) {
      this.setState({
        gameBoard: board,
        winner: 'no winner'
      }, function() {
        /**
        ** Update winner and message in the parent state
        **/
        this.props.gameOverHandler(this.state.winner, this.state.gameOverMessage);
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
   * @params move {String}
   * @params player {String}
   * @params board {Object}
   * @desc Determine if a move is valid and return the new board state
  */
  validMove(move, player, board){
    let newBoard = this.copyBoard(board);

    if(newBoard[move] === ' '){
      newBoard[move] = player;
      return newBoard;
    } else
      return null;
  }

  /**
   * @name getAiMove
   * @params board {Object}
   * @desc Find the best move for AI base on the miniMax algorithm
  */
  getAiMove(board) {
    let bestMoveScore = 100;
    let move = null;
    
    if(this.winner(board, 'x') || this.winner(board, 'o' || this.tie(board))) {
      return null;
    }

    /**
    ** Test Every Possible Move if the game is not already over.
    **/
    for(var i = 0; i < board.length; i++){
      let newBoard = this.validMove(i, this.state.minPlayer, board);
      /**
      ** If validMove returned a valid game board find the best move for AI (maxScore)
      **/
      if(newBoard) {
        var moveScore = this.miniMaxAlgorithm(newBoard, false, true);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }
    return move;
  }

  /**
   * @name miniMaxAlgorithm
   * @params board {Object}
   * @params min {Bool}
   * @params max {Bool}
   * @desc 
  */
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

  /**
   * @name updateBoard
   * @params move {String}
   * @desc Find AI move after every player move and update the board
  */
  updateBoard(move) {
    let player = this.state.currentPlayer;

    /**
    ** Set player move
    **/
    let currentGameBoard = this.validMove(move, player, this.state.gameBoard);

    this.isGameOver(currentGameBoard, player);

    /**
    ** Set AI move
    **/
    player = 'o';
    currentGameBoard = this.validMove(this.getAiMove(currentGameBoard), player, currentGameBoard);

    this.isGameOver(currentGameBoard, player);

    /**
    ** Update current state of the board
    **/
    this.setState({
        gameBoard: currentGameBoard
      });
  }

  render() {
    return (
      <div>
          <ResetButton reset={this.resetBoard.bind(this)}/>
          <div className="board">
            {this.state.gameBoard.map(function(value, i){
              return (
                <Tile
                  key={i}
                  loc={i}
                  value={value}
                  updateBoard={this.updateBoard.bind(this)} />
              );
            }.bind(this))}
          </div>
      </div>
    );
  }
}

export default Board;
