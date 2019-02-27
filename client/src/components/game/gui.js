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
					<div>FPS : {this.props.tester.fps}</div>
					<div>Command : {this.props.tester.command}</div>
					<div>Food : {this.props.tester.food}</div>
				</div>
				<div
					style={{
						position: "absolute",
						top: "100px",
						width: "100px",
						height: "450px",
						backgroundColor: "rgba(32,232,212,0.5)"
					}}
				>
					<div style={{ width: "100%",padding:"2px" }} >
						<img style={{ width: "100%",border:"1px solid black" }} src="assets/gui/boy.png"onClick={this.handleChunks} data-id="boy" />
					</div>
					<div style={{ width: "100%",padding:"2px" }}>
						<img style={{ width: "100%",border:"1px solid black" }} src="assets/gui/gungirl.png"  onClick={this.handleChunks} data-id="gungirl"/>
					</div>
					<div style={{ width: "100%",padding:"2px" }} >
						<img style={{ width: "100%",border:"1px solid black" }} src="assets/gui/knight.png" onClick={this.handleChunks} data-id="knight"/>
					</div>
					<div>Hello</div>
					<div>goodbye</div>
				</div>
			</div>
		);
	}
}

export default GameGui;
