import React, { Component } from "react";
import Engine from "./engine/main";

class GameCanvas extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}

 


	render() {
		return (
			<div
				id="game-container"
				style={{
                    position:"absolute",
                   top:"50px",
                   left:"50px",
					width: "750px",
                    height: "550px",
                    zIndex:"-1"
				}}
			/>
		);
	}
}

export default GameCanvas;