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
						width: "1366px",
						height: "25px",
						backgroundColor: "rgba(30,30,30,0.9)",
						color: "antiquewhite"
					}}
				>
					<div className="container-fluid">
						<div className="row">
		
							<div className="col">Command : {this.props.tester.command}</div>
							<div className="col">Food : {this.props.tester.food}</div>
							<div className="col-2">FPS : {`${this.props.tester.fps}`}</div>
						</div>
					</div>
				</div>
				<div
					style={{
						position: "absolute",
						top: "25px",
						width: "100px",
						height: "850px",
						backgroundColor: "rgba(30,30,30,0.9)"
					}}
				>
					<div style={{ width: "100%", padding: "2px" }}>
						<img
							style={{ width: "100%", border: "1px solid black" }}
							src="assets/gui/boy.png"
							onClick={this.handleChunks}
							data-id="boy"
						/>
					</div>
					<div style={{ width: "100%", padding: "2px" }}>
						<img
							style={{ width: "100%", border: "1px solid black" }}
							src="assets/gui/gungirl.png"
							onClick={this.handleChunks}
							data-id="gungirl"
						/>
					</div>
					<div style={{ width: "100%", padding: "2px" }}>
						<img
							style={{ width: "100%", border: "1px solid black" }}
							src="assets/gui/knight.png"
							onClick={this.handleChunks}
							data-id="knight"
						/>
					</div>
					<div>Hello</div>
					<div>goodbye</div>
				</div>
			</div>
		);
	}
}

export default GameGui;
