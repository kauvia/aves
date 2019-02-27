import React, { Component } from "react";
import "./App.css";
import StartScreen from "./components/startscreen";
import GameScreen from "./components/game";
class App extends Component {
	constructor(props) {
		super(props);
		// for prod
		this.state = {
			display: { StartScreen: "block", GameScreen: "none" },
			gameStarted: false, themeMusic:new Audio("assets/sounds/MainTheme.mp3")
		};
		// for testing game
		// this.state = {
		// 	display: { StartScreen: "none", GameScreen: "block" },
		// 	gameStarted: false
		// };
	}
	componentDidMount(){
		this.state.themeMusic.play()
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
	startGame() {
		this.setState(prevState => ({
			display: { ...prevState, StartScreen: "none", GameScreen: "block" },
			gameStarted: true
		}));
	}
	render() {
		return (
			<div className="App">
				{this.state.gameStarted && (
					<GameScreen
						display={this.state.display.GameScreen}
						gameStarted={this.state.gameStarted}
						themeMusic={this.state.themeMusic}
					/>
				)}
				<StartScreen
					handleStartMenu={this.handleStartMenu}
					display={this.state.display.StartScreen}
				/>
			</div>
		);
	}
}

export default App;
