//Swapping what sprites to show for entities with multiple sprites
class SpriteUpdateSys {
	constructor(objArr, backgroundArr, stage) {
		this.objArr = objArr;
		this.backgroundArr = backgroundArr;
		this.stage = stage;
	}

	update() {
		for (let i in this.objArr) {
			//check if have varying sprites
			if (this.objArr[i].Movement) {
 
				if (this.objArr[i].Movement.attacking) {
		
					this.stage.removeChild(this.objArr[i].Sprite.moving);
					this.stage.removeChild(this.objArr[i].Sprite.idle);
					if (
						this.objArr[i].Movement.prevAttacking !=
						this.objArr[i].Movement.attacking
					) {
						if (this.objArr[i].Movement.direction == "left") {
							this.objArr[i].Sprite.attacking.scale.x = -1;
						} else {
							this.objArr[i].Sprite.attacking.scale.x = 1;
						}

						this.objArr[i].Sprite.attacking.animationSpeed = 0.2;
						this.objArr[i].Sprite.attacking.play();
						this.stage.addChild(this.objArr[i].Sprite.attacking);
					} else {
						if (
							this.objArr[i].Sprite.attacking.currentFrame + 1 ==
							this.objArr[i].Sprite.attacking.totalFrames
						) {
							this.objArr[i].Movement.attacking = false;
							this.stage.removeChild(
								this.objArr[i].Sprite.attacking
							);
							this.stage.addChild(this.objArr[i].Sprite.idle);
						}
					}
				} else {
					//check if any changes
					if (
						this.objArr[i].Movement.prevIdle !=
							this.objArr[i].Movement.idle ||
						this.objArr[i].Movement.prevDirection !=
							this.objArr[i].Movement.direction
					) {
						//set directions
						if (this.objArr[i].Movement.direction == "left") {
							this.objArr[i].Sprite.idle.scale.x = -1;
							this.objArr[i].Sprite.moving.scale.x = -1;
						} else {
							this.objArr[i].Sprite.idle.scale.x = 1;
							this.objArr[i].Sprite.moving.scale.x = 1;
						}

						if (this.objArr[i].Movement.idle) {
							//remove prev sprite
							this.stage.removeChild(this.objArr[i].Sprite.moving);
							this.objArr[i].Sprite.idle.animationSpeed = 0.2;
							this.objArr[i].Sprite.idle.play();
							this.stage.addChild(this.objArr[i].Sprite.idle);
						} else if (!this.objArr[i].Movement.idle) {
							this.stage.removeChild(this.objArr[i].Sprite.idle);
							this.objArr[i].Sprite.moving.animationSpeed = 0.2;
							this.objArr[i].Sprite.moving.play();
							this.stage.addChild(this.objArr[i].Sprite.moving);
						}
					}
				}

				//Update prev Info
				this.objArr[i].Movement.prevDirection = this.objArr[i].Movement.direction;
				this.objArr[i].Movement.prevIdle = this.objArr[i].Movement.idle;
				this.objArr[i].Movement.prevAttacking = this.objArr[i].Movement.attacking;
				this.objArr[i].Movement.idle = true;
	
			}
		}
	}
}

export default SpriteUpdateSys;
