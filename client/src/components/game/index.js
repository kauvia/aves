import React, { Component } from "react";
import Engine from "./engine/main";
import GameCanvas from "./canvas";
import GameGui from "./gui";
class GameScreen extends Component {
	constructor(props) {
		super(props);
		this.engine = new Engine;
		this.state={test:0}
	}
	componentDidMount() {
		this.engine.initialize();
		this.engine.loadMedia();
		this.engine.runLoop();
		this.engine.guiUpdater = data=>{

				this.setState({test:data})
		}
	}

	guiListener=e=>{
		console.log(e.target)	
		this.engine.testSpawner()
	}
 


	render() {
		return (
			<div style={{display:this.props.display}}>
				<GameCanvas/>
				<GameGui guiListener={this.guiListener} tester={this.state.test}/>
			</div>
		);
	}
}

export default GameScreen;
