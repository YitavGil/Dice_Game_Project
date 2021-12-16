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
            {this.props.currTurn==this.state.playerId && <div className="dot"></div>}
            <h1 className="player">Player {this.state.player}</h1>
            <h3 className="curr-score">Current Score: {this.state.currScore}</h3>
            <h1 className="total-score">{this.props.totalScore}</h1>
        </div>
        )
    }
}




export default Players