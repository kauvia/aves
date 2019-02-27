//camera follow target

class CameraFollowSys {
	constructor(target, camera) {
		this.target = target;
		this.camera = camera;
		this.timer = Date.now();
		this.difference = 0;
	}
	update() {
		let distance = this.target.Position.x - this.camera.Position.x;
		let now = Date.now();
		if (!this.target.Movement.idle) {
			this.timer = Date.now();
		}
		this.difference = (now - this.timer) / 1000;
		if (
			this.target.Movement.direction == "right" &&
			!this.target.Movement.idle
		) {
			this.camera.Position.x += this.target.Velocity.x;
		} else if (
			this.target.Movement.direction == "left" &&
			!this.target.Movement.idle
		) {
			this.camera.Position.x -= this.target.Velocity.x;
		} else if (
			distance > -100 &&
			this.target.Movement.direction == "right" &&
			this.target.Movement.idle
		) {
			if (this.difference > 1) {

				this.camera.Position.x += this.camera.Velocity.x;
			}
		} else if (
			distance < 100 &&
			this.target.Movement.direction == "left" &&
			this.target.Movement.idle
		) {
			if (this.difference > 1) {

				this.camera.Position.x -= this.camera.Velocity.x;
			}
		}
		if (this.target.Position.x<100 || this.camera.Position.x<450){
			this.camera.Position.x = 450;
		}
		else if (this.target.Position.x>4900 || this.camera.Position.x>4550){
			this.camera.Position.x = 4550;
		}
	}
}

export default CameraFollowSys;
