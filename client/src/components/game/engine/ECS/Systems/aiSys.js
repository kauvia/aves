class AISys {
	constructor(objArr) {
		this.objArr = objArr;
		this.factionPos = {};
	}
	update(dt) {
		this.getFactionPositions();

		for (let i in this.objArr) {
			this.updateBehavior(i);
		}
	}

	updateBehavior(i) {
		if (this.objArr[i].Faction.belongsTo === "enemy") {
			//   console.log("move and attack player")
			if (
				this.objArr[i].Position.x - this.objArr[i].Size.width/2 >
					this.factionPos.player.rightBound &&
				!this.objArr[i].Movement.attacking
			) {
				this.objArr[i].Movement.idle = false;
				this.objArr[i].Movement.direction = "left";
				this.objArr[i].Position.x--;
			} else if (
				this.objArr[i].Position.x + this.objArr[i].Size.width/2 <
					this.factionPos.player.leftBound &&
				!this.objArr[i].Movement.attacking
			) {
				this.objArr[i].Movement.idle = false;
				this.objArr[i].Movement.direction = "right";

				this.objArr[i].Position.x++;
			} else {
				this.objArr[i].Movement.attacking = true;
			}
		}
	}

	getFactionPositions() {
		this.factionPos = {};
		for (let i in this.objArr) {
			let posX = this.objArr[i].Position.x;
			if (!this.factionPos[this.objArr[i].Faction.belongsTo]) {
				this.factionPos[this.objArr[i].Faction.belongsTo] = {
					leftBound: posX,
					rightBound: posX
				};
			} else {
				if (
					this.factionPos[this.objArr[i].Faction.belongsTo]
						.leftBound > posX
				) {
					this.factionPos[
						this.objArr[i].Faction.belongsTo
					].leftBound = posX;
				} else if (
					this.factionPos[this.objArr[i].Faction.belongsTo]
						.rightBound < posX
				) {
					this.factionPos[
						this.objArr[i].Faction.belongsTo
					].rightBound = posX;
				}
			}
		}
	}
}

export default AISys;
