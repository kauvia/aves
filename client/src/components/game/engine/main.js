import * as PIXI from "pixi.js";

import Entity from "./ECS/Entities/entity";
import * as Components from "./ECS/Components/index";
import RenderSys from "./ECS/Systems/renderSys";
import KeyboardListenerSys from "./ECS/Systems/keyboardListenerSys";
import PlayerMovementSys from "./ECS/Systems/playerMovementSys";
import CameraFollowSys from "./ECS/Systems/cameraFollowSys";
import SpriteUpdateSys from "./ECS/Systems/spriteUpdateSys";
import NpcMovementSys from "./ECS/Systems/npcMovementSys";
import AISys from "./ECS/Systems/aiSys";

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

		this.oldTime = Date.now();
		this.allLoaded = false;
		//entity arrs
		this.playerUnitArr = [];
		this.npcUnitArr = [];
		this.backgroundArr = { forest: [], mountain: [], city: [] };

		this.spritesObj = {};

		this.camera = null;
		this.player = null;

		this.forestStage = new PIXI.Container();
		this.mountainStage = new PIXI.Container();
		this.cityStage = new PIXI.Container();

		this.backgroundStage = new PIXI.Container();
		this.unitStage = new PIXI.Container();
		this.foregroundStage = new PIXI.Container();

		this.loader = new PIXI.loaders.Loader();
		this.keyboardKeys = {};
	}

	initialize() {
		console.log("initializing");

		this.rendererContainer = document.getElementById("game-container");
		this.rendererContainer.appendChild(this.renderer.view);

		this.loadMedia();
	}

	loadSystems() {
		this.camera = new Entity();
		this.camera.addComponent(new Components.Position(400, 300));
		this.camera.addComponent(new Components.Velocity());

		this.RenderSys = new RenderSys(
			this.playerUnitArr,
			this.npcUnitArr,
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
			this.playerUnitArr,
			this.npcUnitArr,
			this.backgroundArr,
			this.unitStage
		);

		this.NpcMovementSys = new NpcMovementSys(
			this.playerUnitArr,
			this.npcUnitArr
		);
		this.AISys = new AISys(this.playerUnitArr, this.npcUnitArr);
	}
	loadMedia() {
		console.log("loading media");

		this.loader
			.add("../assets/caveman-walking.json")
			.add("forest-back-trees", "../assets/parallax-forest-back-trees.png")
			.add("forest-lights", "../assets/parallax-forest-lights.png")
			.add("forest-middle-trees", "../assets/parallax-forest-middle-trees.png")
			.add("forest-front-trees", "../assets/parallax-forest-front-trees.png")
		
			.add("mountain-0", "../assets/parallax-mountain-bg.png")
			.add("mountain-1", "../assets/parallax-mountain-mountain-far.png")
			.add("mountain-2", "../assets/parallax-mountain-mountains.png")
			.add("mountain-3", "../assets/parallax-mountain-mountain-trees.png")
			.add("mountain-4", "../assets/parallax-mountain-foreground-trees.png")

			.load(this.onAssetLoaded);

		// //ADDING BACKGGROUND
		let backTreesTexture = PIXI.Texture.fromImage(
			"../assets/parallax-forest-back-trees.png"
		);
		this.tilingBackTreesSprite = new PIXI.extras.TilingSprite(
			backTreesTexture,
			1200,
			160
		);
		//	this.tilingBackTreesSprite.scale.set(1.5, 1.5);
		this.tilingBackTreesSprite.y = 200;

		let lightingTexture = PIXI.Texture.fromImage(
			"../assets/parallax-forest-lights.png"
		);
		this.tilingLightSprite = new PIXI.extras.TilingSprite(
			lightingTexture,
			1200,
			160
		);
		//	this.tilingLightSprite.scale.set(1.5, 1.5);
		this.tilingLightSprite.y = 200;

		let midTreesTexture = PIXI.Texture.fromImage(
			"../assets/parallax-forest-middle-trees.png"
		);
		this.tilingMidTreesSprite = new PIXI.extras.TilingSprite(
			midTreesTexture,
			1200,
			160
		);
		//	this.tilingMidTreesSprite.scale.set(1.5, 1.5);
		this.tilingMidTreesSprite.y = 200;

		let frontTreesTexture = PIXI.Texture.fromImage(
			"../assets/parallax-forest-front-trees.png"
		);
		this.tilingFrontTreesSprite = new PIXI.extras.TilingSprite(
			frontTreesTexture,
			1200,
			160
		);
		//	this.tilingFrontTreesSprite.scale.set(1.5, 1.5);
		this.tilingFrontTreesSprite.y = 200;

		this.backgroundArr.forest.push(this.tilingBackTreesSprite);
		this.backgroundArr.forest.push(this.tilingLightSprite);
		this.backgroundArr.forest.push(this.tilingMidTreesSprite);
		this.backgroundArr.forest.push(this.tilingFrontTreesSprite);

		//ADDING PLAYERS AND OBJS

		this.forestStage.addChild(this.tilingBackTreesSprite);

		this.forestStage.addChild(this.tilingLightSprite);

		this.forestStage.addChild(this.tilingMidTreesSprite);

	//	this.foregroundStage.addChild(this.tilingFrontTreesSprite);



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

			//MOUNTAINS
		for (let i = 0;i<5;i++){
			let texture = PIXI.Texture.fromFrame("mountain-"+i);
			let tilingSprite = new PIXI.extras.TilingSprite(texture,1200,160);
			tilingSprite.y=200;
			this.mountainStage.addChild(tilingSprite)
			this.backgroundArr.mountain.push(tilingSprite)
		}
console.log(this.mountainStage)

		this.loadEntities();
	};
	loadEntities = () => {
		this.player = new Entity();
		this.player.addComponent(new Components.Position(20, 320));
		this.player.addComponent(new Components.Weapon());
		this.player.addComponent(new Components.Size(32, 32));
		this.player.addComponent(new Components.Velocity(3));

		this.player.addComponent(new Components.Stats());

		this.player.addComponent(new Components.Movement());
		this.player.addComponent(new Components.Faction("player"));
		this.player.addComponent(
			new Components.Sprite(
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanIdleFrames),
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanWalkFrames),
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanAttackFrames),
				new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanDeathFrames)
			)
		);
		this.playerUnitArr.push(this.player);

		let pen = new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanIdleFrames);
		for (let i = 0; i < 1; i++) {
			let fren = new Entity();
			let spawnPos = Math.random() * 500;

			fren.addComponent(new Components.Position(spawnPos, 320));
			fren.addComponent(new Components.Weapon());
			fren.addComponent(new Components.Size(32, 32));
			fren.addComponent(new Components.Velocity(Math.random() * 2 + 1));

			fren.addComponent(new Components.Stats());
			fren.addComponent(new Components.Behaviour(spawnPos));

			fren.addComponent(new Components.Movement());
			fren.addComponent(new Components.Faction("humanUnit"));
			fren.addComponent(
				new Components.Sprite(
					new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanIdleFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanWalkFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanAttackFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanDeathFrames)
				)
			);
			this.npcUnitArr.push(fren);
		}

		for (let i = 0; i < 1; i++) {
			let fren = new Entity();
			let spawnPos = Math.random() * 200;

			fren.addComponent(new Components.Position(spawnPos, 320));
			fren.addComponent(new Components.Weapon());
			fren.addComponent(new Components.Size(32, 32));
			fren.addComponent(new Components.Velocity(Math.random() * 2 + 1));

			fren.addComponent(new Components.Stats());
			fren.addComponent(new Components.Behaviour(spawnPos));

			fren.addComponent(new Components.Movement());
			fren.addComponent(new Components.Faction("playerUnit"));
			fren.addComponent(
				new Components.Sprite(
					new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanIdleFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanWalkFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanAttackFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.cavemanDeathFrames)
				)
			);
			this.playerUnitArr.push(fren);
		}

		// add objs to stage
		for (let i in this.playerUnitArr) {
			this.playerUnitArr[i].Sprite.idle.animationSpeed = 0.2;
			this.playerUnitArr[i].Sprite.idle.play();
			this.unitStage.addChild(this.playerUnitArr[i].Sprite.idle);
		}
		for (let i in this.npcUnitArr) {
			this.npcUnitArr[i].Sprite.idle.animationSpeed = 0.2;
			this.npcUnitArr[i].Sprite.idle.play();
			this.unitStage.addChild(this.npcUnitArr[i].Sprite.idle);
		}

		this.backgroundStage.addChild(this.forestStage)
		this.backgroundStage.addChild(this.mountainStage)
		this.backgroundStage.addChild(this.cityStage)

		this.stage.addChild(this.backgroundStage);
		this.stage.addChild(this.unitStage);
		console.log(this.stage);
		//	this.stage.addChild(this.foregroundStage);

		this.loadSystems();
		this.allLoaded = true;
	};
	update(dt) {
	//	console.log(this.stage)
		//Trottle interation updates
		this.KeyboardListenerSys.inputListener();
		// Update game stuff here
		this.AISys.update(dt);

		//AI then move units

		this.PlayerMovementSys.update(dt);
		this.NpcMovementSys.update(dt);
		this.CameraFollowSys.update();

		this.SpriteUpdateSys.update();

		this.RenderSys.update();

		if (Math.random() > 0.9) {
			this.guiUpdater((1 / dt) * 60);
		}
	}

	render() {
		//render stuff here
		this.renderer.render(this.stage);
		//		console.log(this.stage.children)
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

export default Engine;
