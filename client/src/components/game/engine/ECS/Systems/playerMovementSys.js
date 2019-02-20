//Move player && camera

class PlayerMovementSys {
	constructor(player, keyboardKeys) {
		this.player = player;
		this.keyboardKeys = keyboardKeys;
	}

	update(dt) {
		this.player.components.Movement.prevDirection = this.player.components.Movement.direction;
        this.player.components.Movement.prevIdle =this.player.components.Movement.idle;
        this.player.components.Movement.prevAttacking =this.player.components.Movement.attacking;

        this.player.components.Movement.idle = true;
		if (this.keyboardKeys[65]) {
			this.player.components.Position.x--;
			this.player.components.Movement.idle = false;
			this.player.components.Movement.direction = "left";
		}
		if (this.keyboardKeys[68]) {
			this.player.components.Position.x++;
			this.player.components.Movement.idle = false;
			this.player.components.Movement.direction = "right";
		}
		if (this.keyboardKeys[87]) {
			this.player.components.Position.y--;
			this.player.components.Movement.idle = false;
		}
		if (this.keyboardKeys[83]) {
			this.player.components.Position.y++;
			this.player.components.Movement.idle = false;
        }
        if (this.keyboardKeys[69]){
            this.player.components.Movement.attacking=true;
        }

	}
}

export default PlayerMovementSys;
