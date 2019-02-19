import * as PIXI from "pixi.js";

import Entity from "./ECS/Entities/entity";
import * as Components from "./ECS/Components/index";
import RenderSys from "./ECS/Systems/renderSys";
import KeyboardListenerSys from "./ECS/Systems/keyboardListenerSys";
import PlayerMovementSys from "./ECS/Systems/playerMovementSys";
import CameraFollowSys from "./ECS/Systems/cameraFollowSys";

class Engine {
	constructor(SCREEN_WIDTH = 800, SCREEN_HEIGHT = 600) {
		//Screen size
		this.SCREEN_WIDTH = SCREEN_WIDTH;
		this.SCREEN_HEIGHT = SCREEN_HEIGHT;

		//set up renderer & interactions
		this.renderer = new PIXI.WebGLRenderer(
			this.SCREEN_WIDTH,
			this.SCREEN_HEIGHT,
			{
				backgroundColor: 0x1099bb
			}
		);
		this.stage = new PIXI.Container();
		this.interaction = new PIXI.interaction.InteractionManager(this.renderer, {
			root: this.stage,
			view: this.renderer.view
		});

		this.oldTime = Date.now();

		//entity arrs
		this.objArr = [];
		this.backgroundArr = [];
		this.camera = null;
		this.player = null;

		this.keyboardKeys = {};
	}

	initialize() {
		console.log("initializing");

		this.rendererContainer = document.getElementById("game-container");
		this.rendererContainer.appendChild(this.renderer.view);

		this.loadMedia();

		this.camera = new Entity();
		this.camera.addComponent(new Components.Position(400, 300));

		this.RenderSys = new RenderSys(
			this.objArr,
			this.backgroundArr,
			this.camera,
			this.SCREEN_WIDTH,
			this.SCREEN_HEIGHT
		);

		this.KeyboardListenerSys = new KeyboardListenerSys(this.keyboardKeys);

		this.PlayerMovementSys = new PlayerMovementSys(
			this.player,
			this.keyboardKeys
		);

		this.CameraFollowSys = new CameraFollowSys(this.player, this.camera);
	}

	//   let frontTrees=new PIXI.CanvasRenderer
	//       let frontTrees = new PIXI.tilemap.CompositeRectTileLayer(0,PIXI.utils.TextureCache['../assets/parallax-forest-front-trees.png']);
	//    this.stage.addChild(frontTrees)

	loadMedia() {
		console.log("loading media");

		this.light = new PIXI.Graphics();

		this.light.beginFill(0x505050, 1);
        this.light.drawCircle(300, 300, 25);
		this.light.endFill();
     //   this.light.blendMode=1;
        this.filter1 = new PIXI.filters.BlurFilter(2)

        this.light.blendMode=2
        this.light.filters=[this.filter1]

        this.light1 = new PIXI.Graphics();

		this.light1.beginFill(0xffffFF, 0.1);
		this.light1.drawCircle(350, 300, 25);
		this.light1.endFill();



		//ADDING BACKGGROUND
		let backTreesTexture = PIXI.Texture.fromImage(
			"../assets/parallax-forest-back-trees.png"
		);
		this.tilingBackTreesSprite = new PIXI.extras.TilingSprite(
			backTreesTexture,
			800,
			160
		);
		//	this.tilingBackTreesSprite.scale.set(1.5, 1.5);
		this.tilingBackTreesSprite.y = 200;

		let lightingTexture = PIXI.Texture.fromImage(
			"../assets/parallax-forest-lights.png"
		);
		this.tilingLightSprite = new PIXI.extras.TilingSprite(
			lightingTexture,
			800,
			160
		);
		//	this.tilingLightSprite.scale.set(1.5, 1.5);
		this.tilingLightSprite.y = 200;

		let midTreesTexture = PIXI.Texture.fromImage(
			"../assets/parallax-forest-middle-trees.png"
		);
		this.tilingMidTreesSprite = new PIXI.extras.TilingSprite(
			midTreesTexture,
			800,
			160
		);
		//	this.tilingMidTreesSprite.scale.set(1.5, 1.5);
		this.tilingMidTreesSprite.y = 200;

		let frontTreesTexture = PIXI.Texture.fromImage(
			"../assets/parallax-forest-front-trees.png"
		);
		this.tilingFrontTreesSprite = new PIXI.extras.TilingSprite(
			frontTreesTexture,
			800,
			160
		);
		//	this.tilingFrontTreesSprite.scale.set(1.5, 1.5);
		this.tilingFrontTreesSprite.y = 200;

		this.backgroundArr.push(this.tilingBackTreesSprite);
		this.backgroundArr.push(this.tilingLightSprite);
		this.backgroundArr.push(this.tilingMidTreesSprite);
		this.backgroundArr.push(this.tilingFrontTreesSprite);

		//ADDING PLAYERS AND OBJS

		this.player = new Entity();
		this.player.addComponent(new Components.Position(400, 300));
		this.player.Sprite = new Sprite("../assets/ship8.png");
		this.objArr.push(this.player);

		let fish = new Entity();
		fish.addComponent(new Components.Position(600, 300));
		fish.Sprite = new Sprite("../assets/logo.png");
		fish.Sprite.sprite.scale.set(0.3, 0.3);

		this.objArr.push(fish);

		let cat = new Entity();
		cat.addComponent(new Components.Position(700, 300));
		cat.Sprite = new Sprite("../assets/logo.png");
		cat.Sprite.sprite.scale.set(0.3, 0.3);
		this.objArr.push(cat);

		let pie = new Entity();
		pie.addComponent(new Components.Position(300, 300));
		pie.Sprite = new Sprite("../assets/logo.png");
		pie.Sprite.sprite.scale.set(0.3, 0.3);
		this.objArr.push(pie);

		this.stage.addChild(this.tilingBackTreesSprite);

		this.stage.addChild(this.tilingLightSprite);

		this.stage.addChild(this.tilingMidTreesSprite);
		for (let i in this.objArr) {
			this.stage.addChild(this.objArr[i].Sprite.sprite);
		}
		this.stage.addChild(this.tilingFrontTreesSprite);

        this.stage.addChild(this.light);
        this.stage.addChild(this.light1)
	}

	testSpawner() {}
	update(dt) {
		//Trottle interation updates
		this.interaction.update(dt);
		this.KeyboardListenerSys.inputListener();
		// Update game stuff here

		this.PlayerMovementSys.update(dt);
		this.CameraFollowSys.update();

		this.RenderSys.update();

		if (Math.random() > 0.9) {
			this.guiUpdater((1 / dt) * 60);
		}
	}

	render() {
		//render stuff here
		this.renderer.render(this.stage);
	}

	guiUpdater() {}

	mainLoop = () => {
		// set up RAF
		let newTime = Date.now();
		let dt = newTime - this.oldTime;
		this.oldTime = newTime;
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
	};
	runLoop() {
		this.mainLoop();
	}
}

class Sprite {
	constructor(imgUrl) {
		this.sprite = PIXI.Sprite.fromImage(imgUrl);
		this.sprite.anchor.set(0.5);
		this.sprite.position.set(400, 300);
		// this.sprite.interactive=true;
		// this.sprite.buttonMode=true;
		// this.sprite.on('mouseover',()=>{
		//     this.sprite.position.set(Math.random()*750+25,Math.random()*550+25)
		// })
	}
}

export default Engine;
