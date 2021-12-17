import React, {Component} from "react";
import "./Players.css"

class Players extends Component {
    constructor(props) {
        super(props)
        this.state = {
        player: "", 
        currScore: props.score,
        playerId: props.playerId
        }
        
       
    }

    componentDidMount() {
        this.setState({currScore: this.props.score})

    }
    render(){
        return (
        <div className="player-container">
            <h1 className="player">Player {this.state.playerId}</h1>
            {this.props.currTurn==this.state.playerId && <div className="dot"></div>}
            <h3 className="curr-score">Current Score: <br></br> {this.props.score}</h3>
            <h1 className="total-score">Total: <br></br> {this.props.totalScore}</h1>
        </div>
        )
    }
}




export default Players