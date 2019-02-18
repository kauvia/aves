import * as PIXI from "pixi.js";
import Entity from "./ECS/Entities/entity";
import * as Components from "./ECS/Components/index";
import RenderSys from "./ECS/Systems/renderSys";

class Engine {
	constructor(SCREEN_WIDTH = 800, SCREEN_HEIGHT = 600) {
		//Screen size
		this.SCREEN_WIDTH = SCREEN_WIDTH;
		this.SCREEN_HEIGHT = SCREEN_HEIGHT;

		//set up renderer & interactions
		this.renderer = new PIXI.WebGLRenderer(this.SCREEN_WIDTH, this.SCREEN_HEIGHT, {
			backgroundColor: 0x1099bb
        });
        this.stage = new PIXI.Container();
		this.interaction = new PIXI.interaction.InteractionManager(this.renderer,{
			root: this.stage,
			view: this.renderer.view
        });

        this.oldTime=Date.now()
        
        //entity arrs
        this.objArr=[];
        this.camera=null;
    }

	initialize() {
		this.rendererContainer = document.getElementById("game-container");
        this.rendererContainer.appendChild(this.renderer.view)

        let fish = new Entity;
        fish.addComponent(new Components.Position(600,300));
        fish.Sprite = new Sprite;
        this.objArr.push(fish)

        this.camera = new Entity;
        this.camera.addComponent(new Components.Position(400,300))

        this.RenderSys = new RenderSys(this.objArr,this.camera,this.SCREEN_WIDTH,this.SCREEN_HEIGHT)

        let cat = new Entity;
        cat.addComponent(new Components.Position(700,300));
        cat.Sprite = new Sprite;
        this.objArr.push(cat)

        let pie = new Entity;
        pie.addComponent(new Components.Position(300,300));
        pie.Sprite= new Sprite;
        this.objArr.push(pie)

        for (let i in this.objArr){
            this.stage.addChild(this.objArr[i].Sprite.sprite)
        }

        console.log(this.stage.children  )
  }

	loadMedia() {

    }

    testSpawner(){

    }
	update(dt) {
		//Trottle interation updates
        this.interaction.update(dt);
        // Update game stuff here

        for (let i in this.objArr){
           this.objArr[i].components.Position.x += Math.random()*2-1;
           this.objArr[i].components.Position.y+= Math.random()*2-1;
    

    
    
         }


        this.RenderSys.update()




        if (Math.random()>0.9){
        this.guiUpdater(1/dt*60)}

	}

	render() {
        //render stuff here
        this.renderer.render(this.stage);
    }


    guiUpdater(){
    }


	mainLoop=()=> {
		// set up RAF
		let newTime = Date.now();
        let dt = newTime - this.oldTime;
        this.oldTime=newTime;
		//DeltaTime
		dt < 0
			? (dt = 0)
			: dt > 1000
			? (dt = (1000 * 60) / 1000)
			: (dt = (dt * 60) / 1000);

		//Update
        this.update(dt);

        //Render
        this.render();

        requestAnimationFrame(this.mainLoop);

	}
	runLoop() {
        this.mainLoop()
    }
}

class Sprite{
    constructor(){
        this.sprite= PIXI.Sprite.fromImage('../assets/logo.png');
        this.sprite.anchor.set(0.5);
        this.sprite.position.set(400,300);
        this.sprite.scale.set(0.3,0.3)
        // this.sprite.interactive=true;
        // this.sprite.buttonMode=true;
        // this.sprite.on('mouseover',()=>{
        //     this.sprite.position.set(Math.random()*750+25,Math.random()*550+25)
        // })


    }
}


export default Engine;
