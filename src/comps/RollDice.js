import React,{ Component } from 'react'
import './RollDice.css'
import Die from './Die'
import Players from './Players'
  
class RollDice extends Component{
  
  // Face numbers passes as default props
  static defaultProps = {
    sides : ['one', 'two', 'three', 
             'four', 'five', 'six']
  }
  constructor(props){
    super(props)
      
    // Opening States
    this.state = {
      die1 : 'one',
      die2 : 'one',
      rolling: false,
      player1: 0,
      player2: 0,
      currTurn: 1,
      player1Total: 0,
      player2Total: 0

    }
    this.roll = this.roll.bind(this)
  }
  generateDice() {
      return (
        Math.floor(Math.random() * this.props.sides.length)
      )
  }
  roll(){
    const {sides} = this.props
    const die1Num = this.generateDice()
    const die2Num = this.generateDice()
    const die1 = sides[die1Num];
    const die2 = sides[die2Num];
    this.setState({
      
      // Changing state upon click
      die1 :die1,
      die2 :die2,
      rolling:true
      
    })
      console.log(die1, die2)
    // Start timer of one sec when rolling start
    setTimeout(() => {
     if (this.state.currTurn == 1) {
         this.setState({player1: die1Num + die2Num +2, player1Total: this.state.player1Total + die1Num + die2Num + 2}) 
     } else{
        this.setState({player2: die1Num + die2Num +2, player2Total: this.state.player2Total + die1Num + die2Num + 2})
     }
      
      // Set rolling to false again when time over
      this.setState({rolling:false, currTurn: this.state.currTurn==1 ? 2 : 1})
     console.log(this.state.currTurn)
    },1000)
  }
  
  render(){
    const handleBtn = this.state.rolling ? 
                      'RollDice-rolling' : ''
    const {die1, die2, rolling} = this.state
    return(
        <div>
            <div className='player one'>
                <Players name="one" score={this.state.player1} playerId={1} totalScore= {this.state.player1Total}/>

            </div>

        
            <div className='RollDice'>
                <div className='RollDice-container'>
                <Die face={die1} rolling={rolling}/>
                <Die face={die2} rolling={rolling}/>
                </div>
                <button className={handleBtn}
                        disabled={this.state.rolling} 
                        onClick={this.roll}>
                {this.state.rolling ? 'Rolling' : 'Roll Dice!'}
                </button>
            </div>

            <div className='player two'>
                <Players name="two" score={this.state.player2} playerId={2} totalScore= {this.state.player2Total}/>

            </div>



      </div>
    )
  }
}
  
export default RollDice