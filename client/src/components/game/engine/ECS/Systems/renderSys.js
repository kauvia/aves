//RENDERING ON PIXI (for now, maybe add react later)
class RenderSys {
	constructor(
		playerArr,
		npcArr,
		buildingArr,
		backgroundArr,
		camera,
		SCREEN_WIDTH,
		SCREEN_HEIGHT
	) {
		this.playerArr = playerArr;
		this.npcArr = npcArr;
		this.buildingArr = buildingArr;
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
		for (let i in this.buildingArr) {
			let objX = this.buildingArr[i].Position.x;
			let objY = this.buildingArr[i].Position.y;

			this.buildingArr[i].Sprite.idle.x = objX - camX + this.SCREEN_WIDTH / 2;
			this.buildingArr[i].Sprite.idle.y = objY - camY + this.SCREEN_HEIGHT / 2;

		//	this.buildingArr[i].Sprite.moving.x = objX - camX + this.SCREEN_WIDTH / 2;
		//	this.buildingArr[i].Sprite.moving.y = objY - camY + this.SCREEN_HEIGHT / 2;

	//		this.buildingArr[i].Sprite.attacking.x = objX - camX + this.SCREEN_WIDTH / 2;
	//		this.buildingArr[i].Sprite.attacking.y = objY - camY + this.SCREEN_HEIGHT / 2;

	//		this.buildingArr[i].Sprite.death.x = objX - camX + this.SCREEN_WIDTH / 2;
	//		this.buildingArr[i].Sprite.death.y = objY - camY + this.SCREEN_HEIGHT / 2;
		}


		for (let i in this.backgroundArr.forest) {
			i = parseInt(i)
			if (i%5 == 0){
				this.backgroundArr.forest[i].tilePosition.x = -camX*.25
			} else if (i%5 == 1){
				this.backgroundArr.forest[i].tilePosition.x = -camX*.45
		
			} else if (i%5 == 2){
				this.backgroundArr.forest[i].tilePosition.x = -camX*.6
				if (i> 10){
					this.backgroundArr.forest[i].tilePosition.x = -camX*.6
				}
	
			} else if (i%5 == 3){
				this.backgroundArr.forest[i].tilePosition.x = -camX*.8
				if (i> 10){
					this.backgroundArr.forest[i].tilePosition.x = -camX*.6
				}

			} else if (i%5 == 4){
				this.backgroundArr.forest[i].tilePosition.x = -camX
	
			}
		}
		
	
		
		for (let i in this.backgroundArr.mountain) {

			let step = (parseInt(i)*2 + 2) / this.backgroundArr.mountain.length;
			this.backgroundArr.mountain[i].tilePosition.x = -camX * step;
		}
	}
}

export default RenderSys;
