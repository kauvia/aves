import * as PIXI from "pixi.js";

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
		this.interaction = new PIXI.interaction.InteractionManager({
			root: this.state,
			view: this.renderer.view
		});
		this.rendererContainer = document.getElementById("game-container");

        this.oldTime=Date.now()
    }

	initialize() {
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
        this.testSprite.sprite.rotation += (Math.random()/5)*dt;

        this.testSprite.sprite.x < 0 ? this.testSprite.sprite.x = 0:
        this.testSprite.sprite.x > 800 ? this.testSprite.sprite.x = 800:
        this.testSprite.sprite.x +=(Math.random()-0.5)*5*dt;

        this.testSprite.sprite.y < 0 ? this.testSprite.sprite.y = 0:
        this.testSprite.sprite.y > 600 ? this.testSprite.sprite.y = 600:
        this.testSprite.sprite.y +=(Math.random()-0.5)*5*dt;
	}

	render() {
        //render stuff here
        this.renderer.render(this.stage);
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
            this.sprite.position.set(Math.random()*800,Math.random()*600)
        })


    }
}


export default Engine;
