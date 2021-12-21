import React, { Component } from "react";
import "./RollDice.css";
import Die from "./Die";
import Players from "./Players";


class RollDice extends Component {
  // Face numbers passes as default props
  static defaultProps = {
    sides: ["one", "two", "three", "four", "five", "six"],
  };
  constructor(props) {
    super(props);

    // Opening States
    this.state = {
      die1: "one",
      die2: "one",
      rolling: false,
      player1: 0,
      player2: 0,
      currTurn: 1,
      player1Total: 0,
      player2Total: 0,
      finalScore: 0,
      errorMsg: false,
      winMsg: false,
      gameOver: false,
      winner: "",
    };
    this.roll = this.roll.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  generateDice() {
    return Math.floor(Math.random() * this.props.sides.length);
  }
  resetGame() {

  this.setState({
    rolling: false,
    player1: 0,
    player2: 0,
    currTurn: 1,
    player1Total: 0,
    player2Total: 0,
    finalScore: 0,
    errorMsg: false,
    winMsg: false,
    gameOver: false,
    winner: "",
  })
    }
  roll() {
    if (this.state.finalScore === 0 || isNaN(this.state.finalScore)) {
      this.setState({ errorMsg: true });
      return;
    } else {
      this.setState({ errorMsg: false });
    }
    const { sides } = this.props;
    const die1Num = this.generateDice();
    const die2Num = this.generateDice();
    const die1 = sides[die1Num];
    const die2 = sides[die2Num];
    this.setState({
      // Changing state upon click
      die1: die1,
      die2: die2,
      rolling: true,
    });
    console.log(die1, die2);
    // Start timer of one sec when rolling start
    setTimeout(() => {
      const dieScore = die1Num + die2Num + 2;
      let currentScore = dieScore;
      if (dieScore === 12) {
        currentScore = 0;
      }

      if (this.state.currTurn == 1) {
        if (this.state.player1Total + currentScore === this.state.totalScore) {
          this.setState({
            gameOver: true,
            winMsg: true,
            winner: "player 1 Wins!",
          });
        }
        this.setState({
          player1: currentScore,
          player1Total: this.state.player1Total + currentScore,
        });
      } else {
        if (this.state.player2Total + currentScore === this.state.totalScore) {
          this.setState({
            gameOver: true,
            winMsg: true,
            winner: "player 2 Wins!",
          });
        }
        this.setState({
          player2: currentScore,
          player2Total: this.state.player2Total + currentScore,
        });
      }

      // Set rolling to false again when time over
      this.setState({
        rolling: false,
        currTurn: this.state.currTurn == 1 ? 2 : 1,
      });
      console.log(this.state.currTurn);
    }, 1000);
  }



  render() {
    const handleBtn = this.state.rolling ? "RollDice-rolling" : "";
    const { die1, die2, rolling } = this.state;
    return (
      <div className="board-container">
        <div className="player one">
          <Players
            name="one"
            score={this.state.player1}
            playerId={1}
            totalScore={this.state.player1Total}
            currTurn={this.state.currTurn}
          />
        </div>

        {this.state.winMsg === true && (
          <div className="winner">{this.state.winner}</div>
        )}
        <div className="RollDice">
          <div className="RollDice-container">
            <Die face={die1} rolling={rolling} />
            <Die face={die2} rolling={rolling} />
          </div>
          <button
            className={handleBtn}
            disabled={this.state.rolling}
            onClick={this.roll}
          >
            {this.state.rolling ? "Rolling" : "Roll Dice!"}
          </button>
          {this.state.errorMsg === true && (
            <div className="error">Score must be a positive number</div>
          )}
          <input className="input"
            type="number"
            onChange={(event) =>
              this.setState({ finalScore: +event.target.value })
            }
          ></input>

          <button className="reset" onClick={this.resetGame}>New Game</button>
        </div>

        <div className="player two">
          <Players
            name="two"
            score={this.state.player2}
            playerId={2}
            totalScore={this.state.player2Total}
            currTurn={this.state.currTurn}
          />
        </div>
      </div>
    );
  }
}

export default RollDice;
