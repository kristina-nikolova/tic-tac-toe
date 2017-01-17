import React, { Component } from 'react';
import Modal from 'react-modal';
import Header from '../../components/Header/Header';
import Announcement from '../../components/Announcement/Announcement';
import Score from '../../components/Score/Score';
import SelectPlayer from '../../components/SelectPlayer/SelectPlayer';
import ResetButton from '../../components/ResetButton/ResetButton';
import Board from '../../components/Board/Board';
import { gameConstants } from '../../constants/Game.constants';

const modal = {
  content : {
    width                 : '350px',
    height                : '150px',
    top                   : '380px',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding               : '20px', 
    transform             : 'translate(-50%, -50%)'
  }
};

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
        selectedPlayer: '',
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
        modalIsOpen: true
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
      }, function() {
        /**
         * change level if user has 3 wins
         * **/
        this.changeLevelHandler();
        this.openModal();
      });
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
    if (moves.length === gameConstants.ALL_MOVES_COUNT) {
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

      let newPlayerScore = player === this.state.player ? this.state.score.playerScore + 1 : this.state.score.playerScore,
          newTiesScore = player === 'no winner' ? this.state.score.tiesScore + 1 : this.state.score.tiesScore,
          newAiScore = player === this.state.aiPlayer ? this.state.score.aiScore + 1 : this.state.score.aiScore,
          newLoosingPlay = this.getPossibilityOfLoosing(this.state.level);

      let newGameOverMessage;
      if (newPlayerScore === gameConstants.PLAYER_MOVES_COUNT_FOR_WIN) {
        newGameOverMessage = 'You unlock the next level!';
      } else {
        newGameOverMessage = player === this.state.player ? 'You win!' : 'You lose!';
      }

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
        /**
        ** Update score in the callback because we changed the winner to 'no winner'
        **/
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
    let bestMoveScore = 10,
        move = null,
        positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    /**
    ** Check if game is over
    **/
    if((this.isWinner(board, 'x') || this.isWinner(board, 'o') || this.tie(board))) {
      return null;
    }

    /**
    ** Choose the first move form the predefined array when AI is first player
    ** It is not needed to search a move recursive
    **/
    if (this.state.aiPlayer === 'x' && this.state.firstMove) {
      move = positions[Math.floor(Math.random() * positions.length)];
    }

    /**
    ** Choose a move when AI is second player or it is not a first move
    **/
    if (this.state.aiPlayer === 'o' || (this.state.aiPlayer === 'x' && !this.state.firstMove)) {
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
          let filledTilesCount = newBoard.join('').replace(/ /g, '');

            /**
            ** If this game is loosing for the AI make a wrong first move
            **/
            if (this.state.loosingPlay && (filledTilesCount.length === gameConstants.LOOSING_MOVE_WHEN_PLAYER_IS_FIRST || filledTilesCount.length === gameConstants.LOOSING_MOVE_WHEN_PLAYER_IS_SECOND)) {

              /**
              ** Wrong first move if the player is X
              ** If the aiPlayer is second, bestMove can be 10
              **/
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
    }
    
    if (this.state.firstMove) {
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
    if (this.state.score.playerScore === gameConstants.PLAYER_MOVES_COUNT_FOR_WIN) {
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
   * @name openModal
   * @params 
   * @desc Open the modal for player selection
  */
  openModal() {
    this.setState({modalIsOpen: true});
  }

  /**
   * @name closeModal
   * @params 
   * @desc Close the modal after a  player is selected
  */
  closeModal() {
    this.setState({modalIsOpen: false});
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
            aiPlayer: 'o',
            selectedPlayer: 'x'
          });
          break;
      case 'o':
          this.setState({
            player: 'o',
            aiPlayer: 'x',
            selectedPlayer: 'o'
          }, function() {
            this.makeFirstAiMove();
          });
          break;
      default:
          break;    
      }

      this.closeModal();
  }

  render() {
    return (
      <div className="center">
        <Header message="Tic Tac Toe"/>
        <div>
          <Announcement winner={this.state.winner} 
                        message={this.state.gameOverMessage} />
          <ResetButton reset={this.resetBoard} />
          <Board gameBoard={this.state.gameBoard}
                 winningPath={this.state.winningPath}
                 updateBoardAfterPlayerMove={this.updateBoardAfterPlayerMove} />
          <Score score={this.state.score}
                 level={this.state.level}
                 player={this.state.player}
                 aiPlayer={this.state.aiPlayer} />       
        </div>
        <Modal isOpen={this.state.modalIsOpen}
               style={modal}
               contentLabel="Modal" >
          <SelectPlayer selectPlayerHandler={this.selectPlayer} />
        </Modal>
      </div>
    );
  }
}

export default Game;
