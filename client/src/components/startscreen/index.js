import React, { Component } from "react";

class StartScreen extends Component {
	render() {
		return (
			<div
				className="container-fluid bg-light"
				style={{ height: "100vh",display:this.props.display }}
				onClick={(e)=>this.props.handleStartMenu(e)}
			>
				<div className="row" data-id="new">New</div>
				<div className="row"  data-id="load">Load</div>
				<div className="row"  data-id="options">Options</div>
				<div className="row"  data-id="quit">Quit</div>
			</div>
		);
	}
}

export default StartScreen;
