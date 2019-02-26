//RENDERING ON PIXI (for now, maybe add react later)
class RenderSys {
	constructor(
		playerArr,
		npcArr,
		backgroundArr,
		camera,
		SCREEN_WIDTH,
		SCREEN_HEIGHT
	) {
		this.playerArr = playerArr;
		this.npcArr = npcArr;
		this.backgroundArr = backgroundArr;
		this.camera = camera;
		this.SCREEN_WIDTH = SCREEN_WIDTH;
		this.SCREEN_HEIGHT = SCREEN_HEIGHT;
	}

	update() {
		//get Cam position
		let camX = this.camera.Position.x;
		let camY = this.camera.Position.y;

		//iterate over objs and update their PIXI DISPLAY x & y (NOT SAME AS Component.Position.x & y!!!)
		for (let i in this.playerArr) {
			let objX = this.playerArr[i].Position.x;
			let objY = this.playerArr[i].Position.y;

			this.playerArr[i].Sprite.idle.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.playerArr[i].Sprite.idle.y = objY - camY + this.SCREEN_HEIGHT / 2;

			this.playerArr[i].Sprite.moving.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.playerArr[i].Sprite.moving.y = objY - camY + this.SCREEN_HEIGHT / 2;

			this.playerArr[i].Sprite.attacking.x =
				objX - camX + this.SCREEN_WIDTH / 2;
			this.playerArr[i].Sprite.attacking.y =
				objY - camY + this.SCREEN_HEIGHT / 2;

			this.playerArr[i].Sprite.death.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.playerArr[i].Sprite.death.y = objY - camY + this.SCREEN_HEIGHT / 2;
		}
		for (let i in this.npcArr) {
			let objX = this.npcArr[i].Position.x;
			let objY = this.npcArr[i].Position.y;

			this.npcArr[i].Sprite.idle.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.npcArr[i].Sprite.idle.y = objY - camY + this.SCREEN_HEIGHT / 2;

			this.npcArr[i].Sprite.moving.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.npcArr[i].Sprite.moving.y = objY - camY + this.SCREEN_HEIGHT / 2;

			this.npcArr[i].Sprite.attacking.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.npcArr[i].Sprite.attacking.y = objY - camY + this.SCREEN_HEIGHT / 2;

			this.npcArr[i].Sprite.death.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.npcArr[i].Sprite.death.y = objY - camY + this.SCREEN_HEIGHT / 2;
		}

		for (let i in this.backgroundArr.forest) {
			let step = (parseInt(i) + 2) / this.backgroundArr.forest.length;
			this.backgroundArr.forest[i].tilePosition.x = -camX * step;
		}
		for (let i in this.backgroundArr.mountain) {

			if (camX<1200){
				this.backgroundArr.mountain[i].x=1200
			} else if (camX<2400){
				this.backgroundArr.mountain[i].x=2400-camX
				console.log(camX)
			} else{
				this.backgroundArr.mountain[i].x=0
			}
			let step = (parseInt(i) + 2) / this.backgroundArr.mountain.length;
			this.backgroundArr.mountain[i].tilePosition.x = -camX * step;
		}
	}
}

export default RenderSys;
