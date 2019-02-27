//Move player && camera

class PlayerMovementSys {
	constructor(player, keyboardKeys) {
		this.player = player;
		this.keyboardKeys = keyboardKeys;
	}

	update(dt) {
		this.player.Movement.idle = true;
		if (this.keyboardKeys[65]) {
			//A
			if (
				!this.player.Movement.attacking &&
				this.player.Position.x > 0 &&
				this.player.Stats.health > 0
			) {
				this.player.Position.x -= this.player.Velocity.x;
				this.player.Movement.idle = false;
				this.player.Movement.direction = "left";
			}
		}
		if (this.keyboardKeys[68]) {
			//D
			if (
				!this.player.Movement.attacking &&
				this.player.Position.x < 5000 &&
				this.player.Stats.health > 0
			) {
				this.player.Position.x += this.player.Velocity.x;
				this.player.Movement.idle = false;
				this.player.Movement.direction = "right";
			}
		}
		if (this.keyboardKeys[87]) {
			//W
			this.player.Commands.mode = "defend";
		}
		if (this.keyboardKeys[83]) {
			//S
			this.player.Commands.mode = "hold";
			this.player.Commands.holdPoint = this.player.Position.x;
		}
		if (this.keyboardKeys[81]) {
			//Q
			this.player.Commands.mode = "follow";
		}
		if (this.keyboardKeys[69]) {
			//E
			this.player.Commands.mode = "attack";
		}
	}
}

export default PlayerMovementSys;
