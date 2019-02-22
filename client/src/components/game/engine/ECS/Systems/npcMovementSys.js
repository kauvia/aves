//Move npcs
class NpcMovementSys {
	constructor(objArr) {
		this.objArr = objArr;
	}

	update(dt) {
		for (let i in this.objArr) {
			if (this.objArr[i].Faction.belongsTo != "player") {
				this.moveEntity(dt, i);
			}
		}
	}

	moveEntity(dt, i) {

		if (!this.objArr[i].Movement.idle && !this.objArr[i].Movement.attacking) {
			this.objArr[i].Movement.direction == "left"
				? (this.objArr[i].Position.x -= this.objArr[i].Velocity.x)
				: (this.objArr[i].Position.x += this.objArr[i].Velocity.x);
		}


	}
}

export default NpcMovementSys;
