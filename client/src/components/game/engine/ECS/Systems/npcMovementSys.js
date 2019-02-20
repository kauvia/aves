//Move npcs
class NpcMovementSys {
	constructor(objArr) {
		this.objArr=objArr
	}

	update(dt) {
        for (let i in this.objArr){
            if (this.objArr[i].components.Faction.belongsTo != "player"){
                this.moveEntity(dt,i)
            }
        }

    }
    
    moveEntity(dt,i){
		this.objArr[i].components.Movement.prevDirection = this.objArr[i].components.Movement.direction;
        this.objArr[i].components.Movement.prevIdle =this.objArr[i].components.Movement.idle;
        this.objArr[i].components.Movement.prevAttacking =this.objArr[i].components.Movement.attacking;
   
        this.objArr[i].components.Movement.idle = true;

    }
}

export default NpcMovementSys;
