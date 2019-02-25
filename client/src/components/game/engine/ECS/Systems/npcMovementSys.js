//Move npcs
class NpcMovementSys {
	constructor(playerUnitArr,npcUnitArr) {
		this.playerUnitArr = playerUnitArr;
		this.npcUnitArr=npcUnitArr;
	}

	update(dt) {
		for (let i in this.playerUnitArr) {
			if (this.playerUnitArr[i].Faction.belongsTo != "player") {
				this.moveEntity(dt,this.playerUnitArr, i);
			}
		}
		for (let i in this.npcUnitArr) {
			if (this.npcUnitArr[i].Faction.belongsTo != "player") {
				this.moveEntity(dt,this.npcUnitArr, i);
			}
		}
	}

	moveEntity(dt,objArr ,i) {

		if (!objArr[i].Movement.idle && !objArr[i].Movement.attacking) {
			objArr[i].Movement.direction == "left"
				? (objArr[i].Position.x -= objArr[i].Velocity.x)
				: (objArr[i].Position.x += objArr[i].Velocity.x);
		}


	}
}

export default NpcMovementSys;
