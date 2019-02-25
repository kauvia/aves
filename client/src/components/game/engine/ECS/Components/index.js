class Position {
	constructor(x = 400, y = 300) {
		this.name = "Position";
		this.x = x;
		this.y = y;
	}
}

class Camera {}

class Faction {
	constructor(belongsTo) {
		this.name = "Faction";
		this.belongsTo = belongsTo;
	}
}
class Sprite {
	constructor(idle, moving, attacking, death) {
		this.name = "Sprite";
		this.idle = idle;
		this.moving = moving;
		this.attacking = attacking;
		this.death = death;
	}
}

class Movement {
	//For choosing animated sprites and facings
	constructor(direction = "right", idle = true, attacking = false) {
		this.name = "Movement";
		// left or right
		this.prevDirection = direction;
		this.direction = direction;
		//moving or not
		this.prevIdle = idle;
		this.idle = idle;
		//attacking or not
		this.prevAttacking = attacking;
		this.attacking = attacking;
	}
}

class Weapon {
	constructor(weaponName = "Fist", type = "melee", range = 5, damage = 10) {
		this.name = "Weapon";
		this.weaponName = weaponName;
		this.type = type;
		this.range = range;
		this.damage = damage;
		this.tick = 0;
	}
}

class Size {
	constructor(width, height) {
		this.name = "Size";
		this.width = width;
		this.height = height;
	}
}

class Velocity{
    constructor(x=2){
        this.name="Velocity";
        this.x=x
    }
}

class Behaviour{
	constructor(spawnPoint,activationRange=1000,attackRange=300,followRange=500){
		this.name = "Behaviour";
		this.activationRange = activationRange;
		this.attackRange = attackRange;
		this.followRange = followRange;
		this.ticks = 0;
		this.spawnPoint = spawnPoint;
	}
}

class Stats{
	constructor(health=100){
		this.name="Stats";
		this.health=health;
	}
}

export { Position, Camera, Sprite, Movement, Faction, Weapon, Size,Velocity,Behaviour,Stats };
