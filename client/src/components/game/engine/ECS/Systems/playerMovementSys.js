//Move player && camera

class PlayerMovementSys {
	constructor(player, keyboardKeys) {
		this.player = player;
		this.keyboardKeys = keyboardKeys;
	}

	update(dt) {
		this.player.Movement.idle = true;

		if (this.keyboardKeys[65]) {
			if (!this.player.Movement.attacking) {
				this.player.Position.x -= this.player.Velocity.x;
				this.player.Movement.idle = false;
				this.player.Movement.direction = "left";
			}
		}
		if (this.keyboardKeys[68]) {
			if (!this.player.Movement.attacking) {
				this.player.Position.x += this.player.Velocity.x;
				this.player.Movement.idle = false;
				this.player.Movement.direction = "right";
			}
		}
		if (this.keyboardKeys[87]) {
			this.player.Position.y--;
			this.player.Movement.idle = true;
		}
		if (this.keyboardKeys[83]) {
			this.player.Position.y++;
			this.player.Movement.idle = true;
		}
		if (this.keyboardKeys[69]) {
			this.player.Movement.attacking = true;
		}
	}
}

export default PlayerMovementSys;
