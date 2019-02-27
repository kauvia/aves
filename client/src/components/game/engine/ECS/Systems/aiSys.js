class AISys {
	constructor(playerUnitArr, npcUnitArr, player) {
		this.player = player;
		this.playerUnitArr = playerUnitArr;
		this.npcUnitArr = npcUnitArr;
		this.factionPos = {};
	}

	update(dt) {
		for (let i in this.npcUnitArr) {
			this.updateNpcUnit(dt, i);
		}
		for (let i in this.playerUnitArr) {
			if (this.playerUnitArr[i].Faction.belongsTo == "playerUnit" && this.playerUnitArr[i].Stats.health>0) {
				this.updatePlayerUnit(dt, i);
			} else if (this.playerUnitArr[i].Faction.belongsTo == "playerUnit" && this.playerUnitArr[i].Stats.health<=0){
				this.playerUnitArr[i].Movement.idle=true;
			}
		}
	}
	updatePlayerUnit(dt, i) {
		if (this.player.Commands.mode === "follow") {
			this.followPlayer(dt, i);
		} else if (this.player.Commands.mode === "attack") {
			this.attackEnemies(dt, i);
		} else if (this.player.Commands.mode === "defend") {
			this.defendPlayer(dt, i);
		} else if (this.player.Commands.mode === "hold") {
			this.holdPosition(dt, i);
		}
	}
	followPlayer(dt, i) {
		let unit = this.playerUnitArr[i];
		//		console.log(unit.Behaviour.followRange)

		let distance = unit.Position.x - this.player.Position.x;
		let direction;
		distance <= 0 ? (direction = "right") : (direction = "left");
		if (Math.abs(distance) > unit.Behaviour.followRange) {
			unit.Movement.idle = false;
			unit.Movement.direction = direction;
		} else {
			unit.Movement.idle = true;
		}
	}
	attackEnemies(dt, i) {
		let unit = this.playerUnitArr[i];

		let distance = 100000;
		let target = null;
		for (let j in this.npcUnitArr) {
			let temp = Math.abs(
				this.npcUnitArr[j].Position.x - unit.Position.x
			);
			if (temp < distance && this.npcUnitArr[j].Stats.health > 0) {
				distance = temp;
				target = this.npcUnitArr[j];
			}
		}
		if(target){

			let distanceFromTarget = unit.Position.x - target.Position.x;
			let targetDirection;
			distanceFromTarget <= 0
				? (targetDirection = "right")
				: (targetDirection = "left");
	
			if (
				Math.abs(distanceFromTarget) > unit.Size.width / 2 + unit.Weapon.range &&
				!unit.Movement.attacking
			) {
				unit.Movement.idle = false;
				unit.Movement.direction = targetDirection;
				//			console.log("movetotarget");
			} else {
				//		unit.Weapon.tick++;
				//			console.log(unit.Weapon.tick)
				unit.Movement.attacking = true;
				if (!unit.Movement.prevAttacking) {
					target.Stats.health -= unit.Weapon.damage;
					if (target.Stats.health<=0){
						this.player.Resources.food +=20
					}

					//			console.log(target.Stats.health)
				}
			}
		} else {this.followPlayer(dt,i)}
	}
	defendPlayer(dt, i) {
		let unit = this.playerUnitArr[i];

		let distance = 100000;
		let target = null;
		for (let j in this.npcUnitArr) {
			let temp = Math.abs(
				this.npcUnitArr[j].Position.x - unit.Position.x
			);
			if (temp < distance && this.npcUnitArr[j].Stats.health > 0) {
				distance = temp;
				target = this.npcUnitArr[j];
			}
		}
		if(target && distance<unit.Behaviour.attackRange){

			let distanceFromTarget = unit.Position.x - target.Position.x;
			let targetDirection;
			distanceFromTarget <= 0
				? (targetDirection = "right")
				: (targetDirection = "left");
	
			if (
				Math.abs(distanceFromTarget) > unit.Size.width / 2 + unit.Weapon.range &&
				!unit.Movement.attacking
			) {
				unit.Movement.idle = false;
				unit.Movement.direction = targetDirection;
				//			console.log("movetotarget");
			} else {
				//		unit.Weapon.tick++;
				//			console.log(unit.Weapon.tick)
				unit.Movement.attacking = true;
				if (!unit.Movement.prevAttacking) {
					target.Stats.health -= unit.Weapon.damage;
					if (target.Stats.health<=0){
						this.player.Resources.food +=20
					}
					//			console.log(target.Stats.health)
				}
			}
		} else {this.followPlayer(dt,i)}
	}
	holdPosition(dt, i) {
		let unit = this.playerUnitArr[i];

		let distance = unit.Position.x - this.player.Commands.holdPoint;
		let direction;
		distance <= 0 ? (direction = "right") : (direction = "left");
		if (Math.abs(distance) > unit.Behaviour.followRange) {
			unit.Movement.idle = false;
			unit.Movement.direction = direction;
		} else {
			unit.Movement.idle = true;
			
		}
	}

	// FOR NPC UNITS(NON PLAYER FACTION)
	updateNpcUnit(dt, i) {
		// Activate unit
		let distance = 100000;
		let target = null;
		for (let j in this.playerUnitArr) {
			let temp = Math.abs(
				this.playerUnitArr[j].Position.x - this.npcUnitArr[i].Position.x
			);
			if (temp < distance && this.playerUnitArr[j].Stats.health > 0) {
				distance = temp;
				target = j;
			}
		}
		if (target) {
			distance < this.npcUnitArr[i].Behaviour.attackRange
				? this.unitAttack(dt, i, target)
				: distance < this.npcUnitArr[i].Behaviour.activationRange
				? this.unitActivate(dt, i)
				: this.unitDeactivate(dt, i);
		} else {
			this.unitDeactivate(dt, i);
		}
	}
	unitAttack(dt, i, j) {
		let unit = this.npcUnitArr[i];
		let target = this.playerUnitArr[j];
		let distanceFromTarget = unit.Position.x - target.Position.x;
		let distanceFromSpawn = unit.Position.x - unit.Behaviour.spawnPoint;
		let targetDirection;
		distanceFromTarget <= 0
			? (targetDirection = "right")
			: (targetDirection = "left");

		if (
			Math.abs(distanceFromTarget) > unit.Size.width / 2 + unit.Weapon.range &&
			!unit.Movement.attacking
		) {
			unit.Movement.idle = false;
			unit.Movement.direction = targetDirection;
			//			console.log("movetotarget");
		} else {
			//		unit.Weapon.tick++;
			//			console.log(unit.Weapon.tick)
			unit.Movement.attacking = true;
			if (!unit.Movement.prevAttacking) {
				target.Stats.health -= unit.Weapon.damage;
				//			console.log(target.Stats.health)
			}
		}
	}
	unitActivate(dt, i) {
		let unit = this.npcUnitArr[i];
		unit.Behaviour.ticks += dt;
		let distanceFromSpawn = unit.Position.x - unit.Behaviour.spawnPoint;

		if (Math.abs(distanceFromSpawn) > unit.Behaviour.followRange) {
			if (distanceFromSpawn < 0) {
				unit.Movement.idle = false;
				unit.Movement.direction = "right";
			} else {
				unit.Movement.idle = false;
				unit.Movement.direction = "left";
			}
		} else {
			if (unit.Behaviour.ticks > 50) {
				let rand = Math.random();

				if (rand < 0.1) {
					unit.Movement.idle = false;
					unit.Movement.direction = "left";
					unit.Behaviour.ticks = 0;
				} else if (rand < 0.2) {
					unit.Movement.idle = false;
					unit.Movement.direction = "right";
					unit.Behaviour.ticks = 0;
				} else {
					unit.Movement.idle = true;
					unit.Behaviour.ticks = 0;
				}
			}
		}
	}
	unitDeactivate(dt, i) {
		let unit = this.npcUnitArr[i];
		unit.Movement.idle = true;
	}
}

export default AISys;
