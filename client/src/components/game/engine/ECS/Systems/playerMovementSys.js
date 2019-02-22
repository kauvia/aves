//Move player && camera

class PlayerMovementSys {
	constructor(player, keyboardKeys) {
		this.player = player;
		this.keyboardKeys = keyboardKeys;
	}

	update(dt) {
		this.player.Movement.prevDirection = this.player.Movement.direction;
        this.player.Movement.prevIdle =this.player.Movement.idle;
        this.player.Movement.prevAttacking =this.player.Movement.attacking;

        this.player.Movement.idle = true;
		if (this.keyboardKeys[65]) {
			this.player.Position.x--;
			this.player.Movement.idle = false;
			this.player.Movement.direction = "left";
		}
		if (this.keyboardKeys[68]) {
			this.player.Position.x++;
			this.player.Movement.idle = false;
			this.player.Movement.direction = "right";
		}
		if (this.keyboardKeys[87]) {
			this.player.Position.y--;
			this.player.Movement.idle = false;
		}
		if (this.keyboardKeys[83]) {
			this.player.Position.y++;
			this.player.Movement.idle = false;
        }
        if (this.keyboardKeys[69]){
            this.player.Movement.attacking=true;
        }

	}
}

export default PlayerMovementSys;
