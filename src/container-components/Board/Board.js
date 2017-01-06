import React, { Component } from 'react';
import './Board.scss';
import Tile from '../../components/Tile/Tile';
import ResetButton from '../../components/ResetButton/ResetButton';

class Board extends Component {
  /**
   * @props gameOverHandler()
   * @props resetGameHandler()
   * @props loosingPlay
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
        gameOverMessage: 'Game over!',
        winningPath: [null, null, null],
        firstMove: true
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
        gameOverMessage: 'Game over!',
        winningPath: [],
        firstMove: true
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
  winner(board, player) {   

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
    /**
    ** Set all not empty tiles into moves object
    **/
    let moves = board.join('').replace(/ /g, '');
    if (moves.length === 9) {
      return true;
    }
    return false;
  }

  checkForWinningPath(board, i1, i2, i3, player) {
    if (board[i1] === player && board[i2] === player && board[i3] === player) {
      this.setState({
        winningPath: [i1, i2, i3]
      });
    }
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

        /**
        ** Get winning path to highligh it
        **/
        this.checkForWinningPath(board, 0, 1, 2, player);
        this.checkForWinningPath(board, 3, 4, 5, player);
        this.checkForWinningPath(board, 6, 7, 8, player);
        this.checkForWinningPath(board, 0, 3, 6, player);
        this.checkForWinningPath(board, 1, 4, 7, player);
        this.checkForWinningPath(board, 2, 5, 8, player);
        this.checkForWinningPath(board, 0, 4, 8, player);
        this.checkForWinningPath(board, 2, 4, 6, player);
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
  validMove(move, player, board) {
    if((this.winner(board, 'x') || this.winner(board, 'o') || this.tie(board))) {
      return null;
    }

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
    let bestMoveScore = 10;
    let move = null;
    
    /**
    ** Check if game is over
    **/
    if((this.winner(board, 'x') || this.winner(board, 'o') || this.tie(board))) {
      return null;
    }

    /**
    ** Test Every Possible Move if the game is not already over.
    **/
    for(var i = 0; i < board.length; i++){
      let newBoard = this.validMove(i, this.props.aiPlayer, board);
      /**
      ** If validMove returned a valid game board find the best move for AI (maxScore)
      **/
      if(newBoard) {
        let moveScore = this.miniMaxAlgorithm(newBoard, false, true);

        /**
        ** If this game is loosing for the AI make a wrong first move
        **/
        if (this.props.loosingPlay && this.state.firstMove) {
          if (moveScore >= bestMoveScore) {
            bestMoveScore = moveScore;
            move = i;
          }
        } else {
          /**
          ** If this game is not loosing for the AI make the best move
          **/
          if (moveScore <= bestMoveScore) {
            bestMoveScore = moveScore;
            move = i;
          }
        }
      }
    }
    
    if (this.props.loosingPlay && this.state.firstMove) {
      this.setState({firstMove: false});
    }
    
    return move;
  }

  /**
   * @name miniMaxAlgorithm
   * @params board {Object}
   * @params min {Bool}
   * @params max {Bool}
   * @desc X(player) is maxPlayer and O(ai) is minPlayer
  */
  miniMaxAlgorithm(board, min, max) {
    if (this.winner(board, this.props.player)) {
      return 10;
    } else if (this.winner(board, this.props.aiPlayer)) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      let bestMoveValue = max ? -10 : 10;
      let player = max ? this.props.player : this.props.aiPlayer;

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
    ** Set player move and if no winner and it is valid change the turn
    **/
    let currentGameBoard = this.validMove(move, player, this.state.gameBoard);

    if (currentGameBoard) {
      this.isGameOver(currentGameBoard, player);

      /**
      ** Set AI move and if no winner and it is valid update the state
      **/
      player = 'o';
      currentGameBoard = this.validMove(this.getAiMove(currentGameBoard), player, currentGameBoard);

      if (currentGameBoard) {
        this.isGameOver(currentGameBoard, player);

        /**
        ** Update current state of the board
        **/
        this.setState({
            gameBoard: currentGameBoard
          });
      }  
    } 
  }

  render() {
    return (
      <div>
          <ResetButton reset={this.resetBoard.bind(this)} winningPath={this.state.winningPath} />
          <div className="board">
            {this.state.gameBoard.map(function(value, i){
              return (
                <Tile
                  key={i}
                  loc={i}
                  value={value}
                  winningPath={this.state.winningPath}
                  updateBoard={this.updateBoard.bind(this)} />
              );
            }.bind(this))}
          </div>
      </div>
    );
  }
}

Board.propTypes = {
  gameOverHandler: React.PropTypes.func.isRequired,
  resetGameHandler: React.PropTypes.func.isRequired,
  loosingPlay: React.PropTypes.bool.isRequired
};

export default Board;
