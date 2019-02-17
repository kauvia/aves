import * as PIXI from "pixi.js";

class Engine {
	constructor(SCREEN_WIDTH = 750, SCREEN_HEIGHT = 550) {
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
    }

	initialize() {
		this.rendererContainer = document.getElementById("game-container");
        this.rendererContainer.appendChild(this.renderer.view)
    }

	loadMedia() {
        this.testSprite=new Sprite;
        this.testSprite.sprite.scale.set(0.3,0.3)
       this.stage.addChild(this.testSprite.sprite)
    }

	update(dt) {
		//Trottle interation updates
        this.interaction.update(dt);
        // Update game stuff here
        this.testSprite.sprite.rotation += ((Math.random()-0.5)/2)*dt;

        this.testSprite.sprite.x < 0 ? this.testSprite.sprite.x = 750:
        this.testSprite.sprite.x > 750 ? this.testSprite.sprite.x = 0:
        this.testSprite.sprite.x +=(Math.random()-0.5)*5*dt;

        this.testSprite.sprite.y < 0 ? this.testSprite.sprite.y = 550:
        this.testSprite.sprite.y > 550 ? this.testSprite.sprite.y = 0:
        this.testSprite.sprite.y +=(Math.random()-0.5)*5*dt;

        for (let i in this.objArr){
            
           this.objArr[i].sprite.rotation += ((Math.random()-0.5)/2)*dt;

           this.objArr[i].sprite.x < 0 ? this.testSprite.sprite.x = 750:
           this.objArr[i].sprite.x > 750 ? this.testSprite.sprite.x = 0:
           this.objArr[i].sprite.x +=(Math.random()-0.5)*5*dt;
    
           this.objArr[i].sprite.y < 0 ? this.testSprite.sprite.y = 550:
           this.objArr[i].sprite.y > 550 ? this.testSprite.sprite.y = 0:
           this.objArr[i].sprite.y +=(Math.random()-0.5)*5*dt;
        }

        if (Math.random()>0.9){
        this.guiUpdater(dt*60)}

        this.guiObjects({banana:{fried:{chicken:43},toilet:[1,2,4,null,false]},pen:{is:["i",["s","l"]]}})
	}

	render() {
        //render stuff here
        this.renderer.render(this.stage);
    }

    testSpawner(){
        let obj=new Sprite;
        obj.sprite.scale.set(0.3,0.3);
       this.stage.addChild(obj.sprite);

       this.objArr.push(obj)
       console.log(this.interaction.processInteractive)
       console.log(this.interaction.renderer._lastObjectRendered)
        console.log(this.interaction.hitTest(new PIXI.Point(400,300),this.stage))
    }

    guiObjects(){}
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
        this.sprite.interactive=true;
        this.sprite.buttonMode=true;
        this.sprite.on('mouseover',()=>{
            this.sprite.position.set(Math.random()*750,Math.random()*550)
        })


    }
}


export default Engine;
