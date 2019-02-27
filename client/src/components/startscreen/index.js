import React, { Component } from "react";

class StartScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bgX: 0,
			bgY: 0
		};
	}
	handleMouse=(e)=> {


		let x = e.clientX/2.48;
		let y = e.clientY/2.45;

		this.setState({ bgX: -x, bgY: -y });
	}
	render() {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ height: "100vh", display: this.props.display,fontSize:"26px" }}
				onClick={e => this.props.handleStartMenu(e)}
				onMouseMove={this.handleMouse}
			>
			<div style={{position:"absolute",top:100,left:300,fontSize:"100px", zIndex:-1}}>A Verdant Earth</div>
				<div className="container">
					<img
						src="assets/desert/2/background.png"
						style={{
							position: "absolute",
							zIndex: -2,
							top: this.state.bgY,
							left: this.state.bgX,
							
						}}
					/>
					<div className="row" data-id="new">
						New
					</div>
					<div className="row" data-id="load">
						Load
					</div>
					<div className="row" data-id="options">
						Options
					</div>
					<div className="row" data-id="quit">
						Quit
					</div>
				</div>
			</div>
		);
	}
}

export default StartScreen;
