//Swapping what sprites to show for entities with multiple sprites
class SpriteUpdateSys {
	constructor(playerUnitArr, npcUnitArrArr, backgroundArr, stage) {
		this.playerUnitArr = playerUnitArr;
		this.npcUnitArrArr = npcUnitArrArr;
		this.backgroundArr = backgroundArr;
		this.stage = stage;
	}

	updateAnimatedSprites(objArr, i) {
		if (objArr[i].Movement) {
			if (objArr[i].Movement.attacking) {
				this.stage.removeChild(objArr[i].Sprite.moving);
				this.stage.removeChild(objArr[i].Sprite.idle);
				if (objArr[i].Movement.prevAttacking != objArr[i].Movement.attacking) {
					if (objArr[i].Movement.direction == "left") {
						objArr[i].Sprite.attacking.scale.x = -1;
					} else {
						objArr[i].Sprite.attacking.scale.x = 1;
					}

					objArr[i].Sprite.attacking.animationSpeed = 0.2;
					objArr[i].Sprite.attacking.play();
					this.stage.addChild(objArr[i].Sprite.attacking);
				} else {
					if (
						objArr[i].Sprite.attacking.currentFrame + 1 ==
						objArr[i].Sprite.attacking.totalFrames
					) {
						objArr[i].Movement.attacking = false;
						this.stage.removeChild(objArr[i].Sprite.attacking);
						this.stage.addChild(objArr[i].Sprite.idle);
					}
				}
			} else {
				//check if any changes
				if (
					objArr[i].Movement.prevIdle != objArr[i].Movement.idle ||
					objArr[i].Movement.prevDirection != objArr[i].Movement.direction
				) {
					//set directions
					if (objArr[i].Movement.direction == "left") {
						objArr[i].Sprite.idle.scale.x = -1;
						objArr[i].Sprite.moving.scale.x = -1;
					} else {
						objArr[i].Sprite.idle.scale.x = 1;
						objArr[i].Sprite.moving.scale.x = 1;
					}

					if (objArr[i].Movement.idle) {
						//remove prev sprite
						this.stage.removeChild(objArr[i].Sprite.moving);
						objArr[i].Sprite.idle.animationSpeed = 0.2;
						objArr[i].Sprite.idle.play();
						this.stage.addChild(objArr[i].Sprite.idle);
					} else if (!objArr[i].Movement.idle) {
						this.stage.removeChild(objArr[i].Sprite.idle);
						objArr[i].Sprite.moving.animationSpeed = 0.2;
						objArr[i].Sprite.moving.play();
						this.stage.addChild(objArr[i].Sprite.moving);
					}
				}
			}

			//Update prev Info
			objArr[i].Movement.prevDirection = objArr[i].Movement.direction;
			objArr[i].Movement.prevIdle = objArr[i].Movement.idle;
			objArr[i].Movement.prevAttacking = objArr[i].Movement.attacking;
		}
	}

	update() {
		for (let i in this.playerUnitArr) {
			this.updateAnimatedSprites(this.playerUnitArr,i)
		}
		for (let i in this.npcUnitArrArr){
			this.updateAnimatedSprites(this.npcUnitArrArr,i)
		}
	}
}

export default SpriteUpdateSys;
