//camera follow target

class CameraFollowSys {
	constructor(target, camera) {
		this.target = target;
		this.camera = camera;
	}
	update() {
		this.camera.Position.x = this.target.Position.x;
	}
}

export default CameraFollowSys;