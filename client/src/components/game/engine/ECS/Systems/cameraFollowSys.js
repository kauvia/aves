//camera follow target

class CameraFollowSys {
	constructor(target, camera) {
		this.target = target;
		this.camera = camera;
	}
	update() {
		this.camera.components.Position.x = this.target.components.Position.x;
	//	this.camera.components.Position.y = this.target.components.Position.y;
	}
}

export default CameraFollowSys;