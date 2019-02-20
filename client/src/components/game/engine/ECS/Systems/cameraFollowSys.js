//camera follow target

class CameraFollowSys {
	constructor(target, camera) {
		this.target = target;
		this.camera = camera;
	}
	update() {
		this.camera.components.Position.x = this.target.components.Position.x;
	}
}

export default CameraFollowSys;