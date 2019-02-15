import React, { Component } from "react";
import Engine from "./engine/main";

class GameScreen extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		let engine = new Engine;
		engine.initialize();
		engine.loadMedia();
		engine.runLoop()
	}

 


	render() {
		return (
			<div
				id="game-container"
				style={{
					display: this.props.display,
					height: "800px",
					height: "600px"
				}}
			/>
		);
	}
}

export default GameScreen;
