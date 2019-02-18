class RenderSys{
    constructor(objArr,camera,SCREEN_WIDTH, SCREEN_HEIGHT){
        this.objArr=objArr;
        this.camera=camera;
        this.SCREEN_WIDTH=SCREEN_WIDTH;
        this.SCREEN_HEIGHT=SCREEN_HEIGHT;
    }

    update(){
        //get Cam position
     let camX = this.camera.components.Position.x;
     let camY = this.camera.components.Position.y;


        //iterate over objs and update their PIXI DISPLAY x & y (NOT SAME AS Component.Position.x & y!!!)
     for (let i in this.objArr){
        let objX=this.objArr[i].components.Position.x;
        let objY=this.objArr[i].components.Position.y;


        this.objArr[i].Sprite.sprite.x=objX-camX+this.SCREEN_WIDTH/2
        this.objArr[i].Sprite.sprite.y=objY-camY+this.SCREEN_HEIGHT/2


     }





    }
}

export default RenderSys;