import React, { Component } from "react";
import Engine from "./engine/main";
import GameCanvas from "./canvas";
import GameGui from "./gui";

class GameScreen extends Component {
	constructor(props) {
		super(props);
		this.engine = new Engine(1366, 768);
		this.state = { test: 0, gameStarted: false };
	}
	startGameEngine() {
		this.engine.initialize();
		this.engine.runLoop();
		this.engine.guiUpdater = data => {
			this.setState({ test: data });
		};

		this.engine.guiObjects = data => {
			//		console.log(data)
		};
		//		this.setState({gameStarted:true})
	}
	componentDidMount(){
		this.props.themeMusic.pause()
		this.startGameEngine()
	}
	// componentDidUpdate(){
	// 	console.log(this.props)
	// 	if(this.props.gameStarted && !this.state.gameStarted){
	// 		this.startGameEngine()
	// 	}

	// }
	guiListener = e => {
		this.engine.buyUnits(e.target.dataset.id);
	};

	render() {
		return (
			<div style={{ display: this.props.display }}>
				<GameCanvas />
				<GameGui guiListener={this.guiListener} tester={this.state.test} />
			</div>
		);
	}
}

export default GameScreen;
