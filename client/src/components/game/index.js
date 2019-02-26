import React, { Component } from "react";
import Engine from "./engine/main";
import GameCanvas from "./canvas";
import GameGui from "./gui";
class GameScreen extends Component {
	constructor(props) {
		super(props);
		this.engine = new Engine(1200, 600);
		this.state = { test: 0 };
	}
	componentDidMount() {
		this.engine.initialize();
		this.engine.runLoop();
		this.engine.guiUpdater = data => {
			this.setState({ test: data });
		};

		this.engine.guiObjects = data => {
			//		console.log(data)
		};
	}

	guiListener = e => {
		this.engine.spawnUnits()
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
