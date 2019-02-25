class AISys {
	constructor(playerUnitArr, npcUnitArr) {
		this.playerUnitArr = playerUnitArr;
		this.npcUnitArr = npcUnitArr;
		this.factionPos = {};
	}

	update(dt) {
		for (let i in this.npcUnitArr) {
			this.updateNpcUnit(dt, i);
		}
	}

	updateNpcUnit(dt, i) {
		// Activate unit
		let distance = 100000;
		let target = null;
		for (let j in this.playerUnitArr) {
			let temp = Math.abs(
				this.playerUnitArr[j].Position.x - this.npcUnitArr[i].Position.x
			);
			if (temp < distance) {
				distance = temp;
				target = j;
			}
		}
		distance < this.npcUnitArr[i].Behaviour.attackRange
			? this.unitAttack(dt, i, target)
			: distance < this.npcUnitArr[i].Behaviour.activationRange
			? this.unitActivate(dt, i)
			: this.unitDeactivate(dt, i);
	}
	unitAttack(dt, i, j) {
		let unit = this.npcUnitArr[i];
		let target = this.playerUnitArr[j];
		let distanceFromTarget = unit.Position.x - target.Position.x;
		let targetDirection;
		distanceFromTarget <= 0
			? (targetDirection = "right")
			: (targetDirection = "left");





		}
	unitActivate(dt, i) {
		let unit = this.npcUnitArr[i];
		unit.Behaviour.ticks += dt;
		let distanceFromSpawn = unit.Position.x - unit.Behaviour.spawnPoint;

		if (Math.abs(distanceFromSpawn) > 300) {
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
