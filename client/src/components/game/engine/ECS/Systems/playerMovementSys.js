//Move player && camera

class PlayerMovementSys{
    constructor(player,keyboardKeys){
        this.player = player;
        this.keyboardKeys=keyboardKeys;
    }

    update(dt){

        if (this.keyboardKeys[65]){
            this.player.components.Position.x--
        }
        if (this.keyboardKeys[68]){
            this.player.components.Position.x++
        }
        if (this.keyboardKeys[87]){
            this.player.components.Position.y--
        }
        if (this.keyboardKeys[83]){
            this.player.components.Position.y++
        }
    }

}

export default PlayerMovementSys;