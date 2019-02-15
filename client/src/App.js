import React, { Component } from "react";
import "./App.css";
import StartScreen from "./components/startscreen";
import GameScreen from "./components/game";
class App extends Component {
	constructor(props) {
    super(props);
    // for prod
//		this.state = {display:{StartScreen:"block",GameScreen:"none"}};
    // for testing game
		this.state = {display:{StartScreen:"none",GameScreen:"block"}};

}
	handleStartMenu = e => {
		let selection = e.target.dataset.id;
		switch (selection) {
			case "new":
				{
					this.startGame();
				}
				break;
			case "load":
				{
				}
				break;
			case "options":
				{
				}
				break;
			case "quit":
				{
				}
				break;
		}
  };
  startGame(){
    this.setState(prevState=>({display:{...prevState,StartScreen:"none",GameScreen:"block"}}))
  }

	render() {
    
		return (
			<div className="App">
        <GameScreen display={this.state.display.GameScreen}/>
				<StartScreen handleStartMenu={this.handleStartMenu} display={this.state.display.StartScreen}/>
			</div>
		);
	}
}

export default App;
