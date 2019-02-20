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
			if (this.objArr[i].components.Movement) {
				//console.log(this.objArr[i].components.Movement.attacking)
				if (this.objArr[i].components.Movement.attacking) {
		

					this.stage.removeChild(this.objArr[i].components.Sprite.moving);
					this.stage.removeChild(this.objArr[i].components.Sprite.idle);
					if (
						this.objArr[i].components.Movement.prevAttacking !=
						this.objArr[i].components.Movement.attacking
					) {
						if (this.objArr[i].components.Movement.direction == "left") {
							this.objArr[i].components.Sprite.attacking.scale.x = -1;
						} else {
							this.objArr[i].components.Sprite.attacking.scale.x = 1;
						}
						this.objArr[i].components.Sprite.attacking.animationSpeed = 0.2;
						this.objArr[i].components.Sprite.attacking.play();
						this.stage.addChild(this.objArr[i].components.Sprite.attacking);
					} else {
						if (
							this.objArr[i].components.Sprite.attacking.currentFrame + 1 ==
							this.objArr[i].components.Sprite.attacking.totalFrames
						) {
							this.objArr[i].components.Movement.attacking = false;
							this.stage.removeChild(
								this.objArr[i].components.Sprite.attacking
							);
							this.stage.addChild(this.objArr[i].components.Sprite.idle);
						}
					}
				} else {
					//check if any changes
					if (
						this.objArr[i].components.Movement.prevIdle !=
							this.objArr[i].components.Movement.idle ||
						this.objArr[i].components.Movement.prevDirection !=
							this.objArr[i].components.Movement.direction
					) {
						//set directions
						if (this.objArr[i].components.Movement.direction == "left") {
							this.objArr[i].components.Sprite.idle.scale.x = -1;
							this.objArr[i].components.Sprite.moving.scale.x = -1;
						} else {
							this.objArr[i].components.Sprite.idle.scale.x = 1;
							this.objArr[i].components.Sprite.moving.scale.x = 1;
						}

						if (this.objArr[i].components.Movement.idle) {
							//remove prev sprite
							this.stage.removeChild(this.objArr[i].components.Sprite.moving);
							this.objArr[i].components.Sprite.idle.animationSpeed = 0.2;
							this.objArr[i].components.Sprite.idle.play();
							this.stage.addChild(this.objArr[i].components.Sprite.idle);
						} else if (!this.objArr[i].components.Movement.idle) {
							this.stage.removeChild(this.objArr[i].components.Sprite.idle);

							this.objArr[i].components.Sprite.moving.animationSpeed = 0.2;
							this.objArr[i].components.Sprite.moving.play();
							this.stage.addChild(this.objArr[i].components.Sprite.moving);
						}
					}
				}
			}
		}
	}
}

export default SpriteUpdateSys;
