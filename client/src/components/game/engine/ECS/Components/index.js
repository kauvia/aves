class Position {
	constructor(x = 400, y = 300) {
		this.name = "Position";
		this.x = x;
		this.y = y;
	}
}

class Camera {}

class Faction {
    constructor(belongsTo){
        this.name="Faction";
        this.belongsTo=belongsTo;
    }
}
class Sprite {
	constructor(idle, moving,attacking,death) {
        this.name = "Sprite";
		this.idle = idle;
        this.moving = moving;
        this.attacking=attacking;
        this.death=death
	}
}

class Movement {
    //For choosing animated sprites and facings
	constructor(direction="right", idle = true,attacking=false) {
        this.name= "Movement";
        // left or right
        this.prevDirection=direction;
        this.direction = direction;
        //moving or not
        this.prevIdle=idle;
        this.idle = idle;
        //attacking or not
        this.prevAttacking = attacking;
        this.attacking = attacking;
	}
}

export { Position, Camera, Sprite, Movement,Faction };
