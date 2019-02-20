import * as PIXI from "pixi.js";

import Entity from "./ECS/Entities/entity";
import * as Components from "./ECS/Components/index";
import RenderSys from "./ECS/Systems/renderSys";
import KeyboardListenerSys from "./ECS/Systems/keyboardListenerSys";
import PlayerMovementSys from "./ECS/Systems/playerMovementSys";
import CameraFollowSys from "./ECS/Systems/cameraFollowSys";
import SpriteUpdateSys from "./ECS/Systems/spriteUpdateSys";
import NpcMovementSys from "./ECS/Systems/npcMovementSys";
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
		this.allLoaded = false;
		//entity arrs
		this.objArr = [];
		this.backgroundArr = [];

		this.spritesObj = {};

		this.camera = null;
		this.player = null;

		this.loader = new PIXI.loaders.Loader();
		this.keyboardKeys = {};
	}

	initialize() {
		console.log("initializing");

		this.rendererContainer = document.getElementById("game-container");
		this.rendererContainer.appendChild(this.renderer.view);

		this.loadMedia();
	}

	//   let frontTrees=new PIXI.CanvasRenderer
	//       let frontTrees = new PIXI.tilemap.CompositeRectTileLayer(0,PIXI.utils.TextureCache['../assets/parallax-forest-front-trees.png']);
	//    this.stage.addChild(frontTrees)
	loadSystems() {
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

		this.SpriteUpdateSys = new SpriteUpdateSys(
			this.objArr,
			this.backgroundArr,
			this.stage
		);

		this.NpcMovementSys = new NpcMovementSys(this.objArr)
	}
	loadMedia() {
		console.log("loading media");

		this.loader
			.add("../assets/caveman-walking.json")
			.add("forest-back-trees", "../assets/parallax-forest-back-trees.png")
			.add("forest-lights", "../assets/parallax-forest-lights.png")
			.add("forest-middle-trees", "../assets/parallax-forest-middle-trees.png")
			.add("forest-front-trees", "../assets/parallax-forest-front-trees.png")
			.load(this.onAssetLoaded);

		// //ADDING BACKGGROUND
		// let backTreesTexture = PIXI.Texture.fromImage(
		// 	"../assets/parallax-forest-back-trees.png"
		// );
		// this.tilingBackTreesSprite = new PIXI.extras.TilingSprite(
		// 	backTreesTexture,
		// 	800,
		// 	160
		// );
		// //	this.tilingBackTreesSprite.scale.set(1.5, 1.5);
		// this.tilingBackTreesSprite.y = 200;

		// let lightingTexture = PIXI.Texture.fromImage(
		// 	"../assets/parallax-forest-lights.png"
		// );
		// this.tilingLightSprite = new PIXI.extras.TilingSprite(
		// 	lightingTexture,
		// 	800,
		// 	160
		// );
		// //	this.tilingLightSprite.scale.set(1.5, 1.5);
		// this.tilingLightSprite.y = 200;

		// let midTreesTexture = PIXI.Texture.fromImage(
		// 	"../assets/parallax-forest-middle-trees.png"
		// );
		// this.tilingMidTreesSprite = new PIXI.extras.TilingSprite(
		// 	midTreesTexture,
		// 	800,
		// 	160
		// );
		// //	this.tilingMidTreesSprite.scale.set(1.5, 1.5);
		// this.tilingMidTreesSprite.y = 200;

		// let frontTreesTexture = PIXI.Texture.fromImage(
		// 	"../assets/parallax-forest-front-trees.png"
		// );
		// this.tilingFrontTreesSprite = new PIXI.extras.TilingSprite(
		// 	frontTreesTexture,
		// 	800,
		// 	160
		// );
		// //	this.tilingFrontTreesSprite.scale.set(1.5, 1.5);
		// this.tilingFrontTreesSprite.y = 200;

		// //	this.backgroundArr.push(this.tilingBackTreesSprite);
		// this.backgroundArr.push(this.tilingLightSprite);
		// this.backgroundArr.push(this.tilingMidTreesSprite);
		// this.backgroundArr.push(this.tilingFrontTreesSprite);

		// //ADDING PLAYERS AND OBJS

		// this.stage.addChild(this.tilingBackTreesSprite);

		// this.stage.addChild(this.tilingLightSprite);

		// this.stage.addChild(this.tilingMidTreesSprite);

		// for (let i in this.objArr) {
		// 	this.stage.addChild(this.objArr[i].Sprite.sprite);
		// }

		// this.stage.addChild(this.tilingFrontTreesSprite);
	}

	onAssetLoaded = () => {
		this.spritesObj.cavemanWalkFrames = [];
		for (let i = 1; i <= 16; i++) {
			this.spritesObj.cavemanWalkFrames.push(
				PIXI.Texture.fromFrame("caveman-running-" + i + ".png")
			);
		}

		this.spritesObj.cavemanIdleFrames = [];
		for (let i = 1; i <= 4; i++) {
			this.spritesObj.cavemanIdleFrames.push(
				PIXI.Texture.fromFrame("caveman-idle-" + i + ".png")
			);
		}

		this.spritesObj.cavemanAttackFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.cavemanAttackFrames.push(
				PIXI.Texture.fromFrame("caveman-attack-" + i + ".png")
			);
		}

		this.spritesObj.cavemanDeathFrames = [];
		for (let i = 1; i <= 4; i++) {
			this.spritesObj.cavemanDeathFrames.push(
				PIXI.Texture.fromFrame("caveman-death-" + i + ".png")
			);
		}

		this.loadEntities();
	};
	loadEntities = () => {
		this.player = new Entity();
		this.player.addComponent(new Components.Position(400, 300));
		this.player.addComponent(new Components.Movement());
		this.player.addComponent(new Components.Faction("player"))
		this.player.addComponent(
			new Components.Sprite(
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanIdleFrames),
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanWalkFrames),
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanAttackFrames),
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanDeathFrames)
			)
		);
		this.objArr.push(this.player);

		this.test = new Entity();
		this.test.addComponent(new Components.Position(300, 300));
		this.test.addComponent(new Components.Movement());
		this.test.addComponent(new Components.Faction("enemy"))
		this.test.addComponent(
			new Components.Sprite(
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanIdleFrames),
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanWalkFrames),
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanAttackFrames),
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanDeathFrames)
			)
		);
		this.objArr.push(this.test);


		this.test.components.Movement.prevAttacking=true;
		this.test.components.Movement.attacking=true;
			this.test.components.Sprite.attacking.animationSpeed=0.2;
			this.test.components.Sprite.attacking.play();
			this.stage.addChild(this.test.components.Sprite.attacking);


		// add objs to stage
		for (let i in this.objArr) {
			this.objArr[i].components.Sprite.idle.animationSpeed = 0.2;
			this.objArr[i].components.Sprite.idle.play();
			this.stage.addChild(this.objArr[i].components.Sprite.idle);
		}

		this.loadSystems();
		this.allLoaded = true;
	};
	testSpawner() {}
	update(dt) {
		//Trottle interation updates
		this.interaction.update(dt);
		this.KeyboardListenerSys.inputListener();
		// Update game stuff here

		this.PlayerMovementSys.update(dt);
		this.NpcMovementSys.update(dt)

		this.SpriteUpdateSys.update();
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
		if (this.allLoaded) {
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
		}
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
