//RENDERING ON PIXI (for now, maybe add react later)
class RenderSys {
	constructor(objArr, backgroundArr, camera, SCREEN_WIDTH, SCREEN_HEIGHT) {
		this.objArr = objArr;
		this.backgroundArr = backgroundArr;
		this.camera = camera;
		this.SCREEN_WIDTH = SCREEN_WIDTH;
		this.SCREEN_HEIGHT = SCREEN_HEIGHT;
	}

	update() {
		//get Cam position
		let camX = this.camera.components.Position.x;
		let camY = this.camera.components.Position.y;

		//iterate over objs and update their PIXI DISPLAY x & y (NOT SAME AS Component.Position.x & y!!!)
		for (let i in this.objArr) {
			let objX = this.objArr[i].components.Position.x;
			let objY = this.objArr[i].components.Position.y;

			this.objArr[i].components.Sprite.idle.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.objArr[i].components.Sprite.idle.y = objY - camY + this.SCREEN_HEIGHT / 2;


			this.objArr[i].components.Sprite.moving.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.objArr[i].components.Sprite.moving.y = objY - camY + this.SCREEN_HEIGHT / 2;
	
			this.objArr[i].components.Sprite.attacking.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.objArr[i].components.Sprite.attacking.y = objY - camY + this.SCREEN_HEIGHT / 2;

			this.objArr[i].components.Sprite.death.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.objArr[i].components.Sprite.death.y = objY - camY + this.SCREEN_HEIGHT / 2;
	
	
		}

		for (let i in this.backgroundArr) {
            let step = (parseInt(i)+2)/this.backgroundArr.length;
			this.backgroundArr[i].tilePosition.x = -camX*step;
		}
	}
}

export default RenderSys;
