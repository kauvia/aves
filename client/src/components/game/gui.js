import React, { Component } from "react";

class GameGui extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}

	handleChunks = e => {
		this.props.guiListener(e);
	};
	render() {
		return (
			<div id="game-gui">
				<div
					style={{
						position: "absolute",
						width: "800px",
						height: "100px",
						backgroundColor: "rgba(223,32,232,0.5)"
					}}
				>
					<button onClick={this.handleChunks}>Spawn chunks</button>
					<div>FPS : {this.props.tester.fps}</div>
					<div>Order : {this.props.tester.command}</div>

				</div>
				<div
					style={{
						position: "absolute",
						top:"100px",
						width: "100px",
						height: "450px",
						backgroundColor: "rgba(32,232,212,0.5)"
					}}
				>
					<div>Hello</div>
					<div>goodbye</div>
				</div>
			</div>
		);
	}
}

export default GameGui;
