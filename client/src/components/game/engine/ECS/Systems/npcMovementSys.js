//Move npcs
class NpcMovementSys {
	constructor(objArr) {
		this.objArr=objArr
	}

	update(dt) {
        for (let i in this.objArr){
            if (this.objArr[i].Faction.belongsTo != "player"){
                this.moveEntity(dt,i)
            }
        }

    }
    
    moveEntity(dt,i){
		this.objArr[i].Movement.prevDirection = this.objArr[i].Movement.direction;
        this.objArr[i].Movement.prevIdle =this.objArr[i].Movement.idle;
        this.objArr[i].Movement.prevAttacking =this.objArr[i].Movement.attacking;
   
        this.objArr[i].Movement.idle = true;

    }
}

export default NpcMovementSys;
