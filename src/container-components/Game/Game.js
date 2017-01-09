import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Announcement from '../../components/Announcement/Announcement';
import Score from '../../components/Score/Score';
import SelectPlayer from '../../components/SelectPlayer/SelectPlayer';
import ResetButton from '../../components/ResetButton/ResetButton';
import Board from '../../components/Board/Board';

const PLAYER_MOVES_COUNT_FOR_WIN = 1,
      ALL_MOVES_COUNT = 9;

class Game extends Component {
  constructor() {
      super();
      this.state = {
        gameBoard: [
          ' ',' ',' ',
          ' ',' ',' ',
          ' ',' ',' '
        ],
        player: 'x',
        aiPlayer: 'o',
        firstMove: true,
        winner: null,
        winningPath: [null, null, null],
        gameOverMessage: 'Game over!',
        score: {
          playerScore: 0,
          tiesScore: 0,
          aiScore: 0
        },
        loosingPlay: Math.random() >= 0.5,
        level: 1, 
        isBoardEmpty: true
      };

      this.selectPlayer = this.selectPlayer.bind(this);
      this.resetBoard = this.resetBoard.bind(this);
      this.updateBoardAfterPlayerMove = this.updateBoardAfterPlayerMove.bind(this);
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
        firstMove: true,
        winner: null,
        winningPath: [],
        gameOverMessage: 'Game over!',
        isBoardEmpty: true
      });

      /**
       * Ai makes the first move if the user is choose to be Player O
       * **/
      if(this.state.aiPlayer === 'x') {
        this.makeFirstAiMove();
      }

      /**
       * change level if user has 3 wins
       * **/
      this.changeLevelHandler();
  }

  /**
   * @name isWinner
   * @params board {Object}
   * @params player {String}
   * @desc Check if some player is a winner
  */
  isWinner(board, player) {
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
    if (moves.length === ALL_MOVES_COUNT) {
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

    if (this.isWinner(board, player)) {

      let newGameOverMessage = player === this.state.player ? 'You win!' : 'You lose!',
          newPlayerScore = player === this.state.player ? this.state.score.playerScore + 1 : this.state.score.playerScore,
          newTiesScore = player === 'no winner' ? this.state.score.tiesScore + 1 : this.state.score.tiesScore,
          newAiScore = player === this.state.aiPlayer ? this.state.score.aiScore + 1 : this.state.score.aiScore,
          newLoosingPlay = this.getPossibilityOfLoosing(this.state.level);

      this.setState({
        gameBoard: board,
        winner: player,
        gameOverMessage: newGameOverMessage,
        score: {
          playerScore: newPlayerScore,
          tiesScore: newTiesScore,
          aiScore: newAiScore
        },
        loosingPlay: newLoosingPlay
      }, function() {
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
      let newLoosingPlay = this.getPossibilityOfLoosing(this.state.level);

      this.setState({
        gameBoard: board,
        winner: 'no winner',
        gameOverMessage: 'Game over!',
        loosingPlay:  newLoosingPlay
      }, function() {

        let newPlayerScore = this.state.winner === this.state.player ? this.state.score.playerScore + 1 : this.state.score.playerScore,
            newTiesScore = this.state.winner === 'no winner' ? this.state.score.tiesScore + 1 : this.state.score.tiesScore,
            newAiScore = this.state.winner === this.state.aiPlayer ? this.state.score.aiScore + 1 : this.state.score.aiScore;
        
        this.setState({
          score: {
            playerScore: newPlayerScore,
            tiesScore: newTiesScore,
            aiScore: newAiScore
          }
        });
       });

      return;
    }
  }

  /**
   * @name validMove
   * @params move {String}
   * @params player {String}
   * @params board {Object}
   * @desc Determine if a move is valid and return the new board state
  */
  validMove(move, player, board) {
    
    if((this.isWinner(board, 'x') || this.isWinner(board, 'o') || this.tie(board))) {
      return null;
    }

    /**
     * Something is eneter in the board
     */
     if (this.state.isBoardEmpty) {
      this.setState({
        isBoardEmpty: false
      });
     }
    
    /**
     * Create a new version of the board to manipulate it
     */
    let newBoard = board.slice(0);

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
    if((this.isWinner(board, 'x') || this.isWinner(board, 'o') || this.tie(board))) {
      return null;
    }

    /**
    ** Test Every Possible Move if the game is not already over.
    **/
    for(var i = 0; i < board.length; i++){
      let newBoard = this.validMove(i, this.state.aiPlayer, board);
      /**
      ** If validMove returned a valid game board find the best move for AI (maxScore)
      **/
      if(newBoard) {
        let moveScore = this.miniMaxAlgorithm(newBoard, false, true);

        /**
        ** If this game is loosing for the AI make a wrong first move
        **/
        if (this.state.loosingPlay && this.state.firstMove) {
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
    
    if (this.state.loosingPlay && this.state.firstMove) {
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
    if (this.isWinner(board, this.state.player)) {
      return 10;
    } else if (this.isWinner(board, this.state.aiPlayer)) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      let bestMoveValue = max ? -10 : 10;
      let player = max ? this.state.player : this.state.aiPlayer;

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
   * @name updateBoardAfterPlayerMove
   * @params move {String}
   * @desc Find AI move after every player move and update the board
  */
  updateBoardAfterPlayerMove(move) {
    /**
    ** Set player move and if no winner and it is valid change the turn
    **/
    let currentGameBoard = this.validMove(move, this.state.player, this.state.gameBoard);

    if (currentGameBoard) {
      this.isGameOver(currentGameBoard, this.state.player);

      /**
      ** Set AI move and if no winner and it is valid update the state
      **/
      currentGameBoard = this.validMove(this.getAiMove(currentGameBoard), this.state.aiPlayer, currentGameBoard);

      if (currentGameBoard) {
        this.isGameOver(currentGameBoard, this.state.aiPlayer);

        /**
        ** Update current state of the board
        **/
        this.setState({
            gameBoard: currentGameBoard
          });
      }  
    } 
  }

  /**
   * @name makeFirstAiMove
   * @params 
   * @desc Ai makes a first move and the board is updated
  */
  makeFirstAiMove() {
    let currentGameBoard = this.validMove(this.getAiMove(this.state.gameBoard), this.state.aiPlayer, this.state.gameBoard);

    if (currentGameBoard) {
        this.isGameOver(currentGameBoard, this.state.aiPlayer);

        this.setState({
          gameBoard: currentGameBoard
        });
    } 
  }

  /**
   * @name setPossibilityOfLoosing
   * @params {Number} level
   * @desc Change the possibility of loosing game from AI depends on the level
  */
  setPossibilityOfLoosing(level) {
    switch(level) {
      case 1:
          this.setState({
            loosingPlay:  Math.random() >= 0.5
          });
          break;
      case 2:
          this.setState({
            loosingPlay:  Math.random() > 0.8
          });
          break;
      case 3:
          this.setState({
            loosingPlay: false
          });
          break;
      default:
          break;    
      }
  }

  /**
   * @name getPossibilityOfLoosing
   * @params {Number} level
   * @desc Return the possibility of loosing game from AI
  */
  getPossibilityOfLoosing(level) {
    switch(level) {
      case 1:
        return Math.random() >= 0.5;
      case 2:
        return Math.random() > 0.8;
      case 3:
        return false;
      default:
        break;    
      }
  }

  /**
   * @name changeLevelHandler
   * @params 
   * @desc Change game level
  */
  changeLevelHandler() {
    if (this.state.score.playerScore === PLAYER_MOVES_COUNT_FOR_WIN) {
      this.setState({
        level: this.state.level + 1,
        score: {
          playerScore: 0,
          tiesScore: 0,
          aiScore: 0
        }
      }, function() {
        /**
        * update the possibility of loosing right after the level is changed
        **/
        this.setPossibilityOfLoosing(this.state.level);
      });
    } else {
      this.setPossibilityOfLoosing(this.state.level);
    }
  }

  /**
   * @name selectPlayer
   * @params 
   * @desc Change the player is user is select another option
  */
  selectPlayer(selectedPlayer) {
     switch(selectedPlayer) {
      case 'x':
          this.setState({
            player: 'x',
            aiPlayer: 'o'
          });
          break;
      case 'o':
          this.setState({
            player: 'o',
            aiPlayer: 'x'
          }, function() {
            this.makeFirstAiMove();
          });
          break;
      default:
          break;    
      }

    // if (selectedPlayer === 'o') {
    //   this.setState({
    //     player: 'o',
    //     aiPlayer: 'x'
    //   }, function() {
    //     this.makeFirstAiMove();
    //   });
    // }
  }

  render() {
    return (
      <div className="App center">
        <Header message="Tic Tac Toe"/>
        <div>
          <Announcement winner={this.state.winner} 
                        message={this.state.gameOverMessage} />
          <ResetButton reset={this.resetBoard} />
          <Board gameBoard={this.state.gameBoard}
                 winningPath={this.state.winningPath}
                 updateBoardAfterPlayerMove={this.updateBoardAfterPlayerMove} />
           <SelectPlayer selectPlayerHandler={this.selectPlayer}
                  showSelectPlayer={this.state.isBoardEmpty} />
          <Score score={this.state.score}
                 level={this.state.level} />       
        </div>
      </div>
    );
  }
}

export default Game;
