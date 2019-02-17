import React, { Component } from "react";

class GameGui extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}

    handleChunks=e=>{
        this.props.guiListener(e)
    }
	render() {
		return (
			<div
				id="game-gui"
				style={{
					width: "800px",
                    height: "600px",
                    position:"absolute",
                    top:'0px',
                    left:"0px",
                    zIndex:"-2"
				}}
			>
            <div style={{width:"800px",height:"100px",backgroundColor:"blue"}}>
              
              
              <button onClick={this.handleChunks}>Spawn chunks</button>
                <div>{this.props.tester}</div>

            </div>
            
            
            </div>
		);
	}
}

export default GameGui;