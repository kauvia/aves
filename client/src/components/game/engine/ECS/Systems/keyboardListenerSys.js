//Keyboard listeners and issuers

class KeyboardListenerSys {
	constructor(keyboard) {
		this.keys = keyboard;
	}
	inputListener = () => {
		onkeydown = onkeyup = e => {
			e = e;
			this.keys[e.keyCode] = e.type == "keydown";
        };
 //       console.log(this.keys)
	};
}

export default KeyboardListenerSys;