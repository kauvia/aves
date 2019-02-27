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

const ranN = num => Math.floor(Math.random() * num); //return random number from 0-num

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
		this.buildingArr = [];
		this.backgroundArr = { forest: [], mountain: [], city: [] };

		this.spritesObj = {};

		this.level = 1;

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
			this.buildingArr,
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
			this.buildingArr,
			this.backgroundArr,
			this.unitStage
		);

		this.NpcMovementSys = new NpcMovementSys(
			this.playerUnitArr,
			this.npcUnitArr
		);
		this.AISys = new AISys(this.playerUnitArr, this.npcUnitArr, this.player);
	}
	loadMedia() {
		console.log("loading media");

		this.loader
			.add("../assets/caveman-walking.json")
			.add("../assets/skeleton.json")

			.add("../assets/campfire.json")

			.add("building-01", "../assets/building-01.png")

			.add("forest-1", "../assets/parallax-forest-back-trees.png")
			.add("forest-2", "../assets/parallax-forest-lights.png")
			.add("forest-3", "../assets/parallax-forest-middle-trees.png")
			.add("forest-4", "../assets/parallax-forest-front-trees.png")

			.add("mountain-1", "../assets/Hills-Layer-01.png")
			.add("mountain-2", "../assets/Hills-Layer-02.png")
			.add("mountain-3", "../assets/Hills-Layer-03.png")
			.add("mountain-4", "../assets/Hills-Layer-04.png")
			.add("mountain-5", "../assets/Hills-Layer-05.png")
			.add("mountain-6", "../assets/Hills-Layer-06.png")

			.load(this.onAssetLoaded);
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

		this.spritesObj.skeletonWalkFrames = [];
		for (let i = 1; i <= 13; i++) {
			this.spritesObj.skeletonWalkFrames.push(
				PIXI.Texture.fromFrame("skeleton-walk-" + i + ".png")
			);
		}

		this.spritesObj.skeletonIdleFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.skeletonIdleFrames.push(
				PIXI.Texture.fromFrame("skeleton-idle-" + i + ".png")
			);
		}

		this.spritesObj.skeletonAttackFrames = [];
		for (let i = 1; i <= 15; i++) {
			this.spritesObj.skeletonAttackFrames.push(
				PIXI.Texture.fromFrame("skeleton-attack-" + i + ".png")
			);
		}

		this.spritesObj.skeletonDeathFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.skeletonDeathFrames.push(
				PIXI.Texture.fromFrame("skeleton-dead-" + i + ".png")
			);
		}
		//CAMPFIRE
		this.spritesObj.campfireFrames = [];
		for (let i = 1; i <= 5; i++) {
			this.spritesObj.campfireFrames.push(
				PIXI.Texture.fromFrame("campfire-" + i + ".png")
			);
		}


		this.generateLevel();
	};

	generateLevel = () => {
		// for (let i = 0; i < 10; i++) {
		// 	let spawnPos = i * 2000;
		// 	let building = new Entity();
		// 	building.addComponent(new Components.Position(spawnPos, 305));
		// 	building.addComponent(new Components.Size(32, 32));
		// 	building.addComponent(new Components.Faction("player"));
		// 	building.addComponent(
		// 		new Components.Sprite(
		// 			new PIXI.extras.AnimatedSprite(PIXI.Texture.fromFrame("building-01"))
		// 		)
		// 	);
		// 	this.buildingArr.push(building);
		// }


		//spawn camp(base)
		for (let i = 0; i < 2; i++) {
			let spawnPos = i * 2800+100;
			let campfire = new Entity();
			campfire.addComponent(new Components.Position(spawnPos, 305));
			campfire.addComponent(new Components.Size(32, 32));
			campfire.addComponent(new Components.Faction("player"));
			campfire.addComponent(
				new Components.Sprite(
					new PIXI.extras.AnimatedSprite(this.spritesObj.campfireFrames)
				)
			);
			this.buildingArr.push(campfire);
		}

		//spawn Player
		this.player = new Entity();
		this.player.addComponent(new Components.Position(20, 320));
		this.player.addComponent(new Components.Weapon());
		this.player.addComponent(new Components.Size(32, 32));
		this.player.addComponent(new Components.Velocity(3));

		this.player.addComponent(new Components.Stats());
		this.player.addComponent(new Components.Resources());

		this.player.addComponent(new Components.Commands());
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

		//spawn Enemy
		for (let i = 0; i < 2; i++) {
			let skelly = new Entity();
			let spawnPos = Math.random() * 500;
			spawnPos = 600;

			skelly.addComponent(new Components.Position(spawnPos, 320));
			skelly.addComponent(new Components.Weapon("pikeaxe", "melee", 20, 25));
			skelly.addComponent(new Components.Size(32, 32));
			skelly.addComponent(new Components.Velocity(Math.random() * 1 + 1));

			skelly.addComponent(new Components.Stats());
			skelly.addComponent(new Components.Behaviour(spawnPos));

			skelly.addComponent(new Components.Movement());
			skelly.addComponent(new Components.Faction("humanUnit"));
			skelly.addComponent(
				new Components.Sprite(
					new PIXI.extras.AnimatedSprite(this.spritesObj.skeletonIdleFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.skeletonWalkFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.skeletonAttackFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.skeletonDeathFrames)
				)
			);
			this.npcUnitArr.push(skelly);
		}


		//Setup Background
		//Forests
		if (this.level === 1){
			for (let i = 1; i <= 4; i++) {
				let texture = PIXI.Texture.fromFrame("forest-" + i);
				let tilingSprite = new PIXI.extras.TilingSprite(texture, 1200, 160);
				tilingSprite.y = 200;
				if (i<4){

					this.forestStage.addChild(tilingSprite);
				}else {
					this.foregroundStage.addChild(tilingSprite)

				}
				this.backgroundArr.forest.push(tilingSprite);
			}
	

		}else if (this.level ===2){

		//MOUNTAINS
		for (let i = 1; i <= 6; i++) {
			let texture = PIXI.Texture.fromFrame("mountain-" + i);
			let tilingSprite = new PIXI.extras.TilingSprite(texture, 1200, 256);
			tilingSprite.y = 95;
			if(i<5){
				this.mountainStage.addChild(tilingSprite);

			} else{
this.foregroundStage.addChild(tilingSprite)
			}
					this.backgroundArr.mountain.push(tilingSprite);
		}

		} else if (this.level ===3){



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

		for (let i in this.buildingArr) {
			this.buildingArr[i].Sprite.idle.animationSpeed = 0.2;
			this.buildingArr[i].Sprite.idle.play();
			this.unitStage.addChild(this.buildingArr[i].Sprite.idle);
		}

		this.backgroundStage.addChild(this.forestStage);
		this.backgroundStage.addChild(this.mountainStage);
		this.backgroundStage.addChild(this.cityStage);

		this.stage.addChild(this.backgroundStage);
		this.stage.addChild(this.unitStage);
		console.log(this.stage);
		this.stage.addChild(this.foregroundStage);

		this.loadSystems();
		this.allLoaded = true;
	};

	spawnUnits() {
		let targetCamp;
		for (let i in this.buildingArr) {
			let distance = 1000000000000000;
			let tempD = Math.abs(
				this.player.Position.x - this.buildingArr[i].Position.x
			);
			if (tempD < distance && tempD < 200) {
				distance = tempD;
				targetCamp = this.buildingArr[i];
			}
		}
		if (targetCamp && this.player.Resources.food >= 10) {
			this.player.Resources.food -= 10;

			let fren = new Entity();
			let spawnPos = targetCamp.Position.x;

			fren.addComponent(new Components.Position(spawnPos, 320));
			fren.addComponent(new Components.Weapon());
			fren.addComponent(new Components.Size(32, 32));
			fren.addComponent(new Components.Velocity(Math.random() * 2 + 1));

			fren.addComponent(new Components.Stats());
			fren.addComponent(
				new Components.Behaviour(spawnPos, 1000, 300, 20 + Math.random() * 100)
			);

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
			fren.Sprite.idle.animationSpeed = 0.2;
			fren.Sprite.idle.play();
			this.unitStage.addChild(fren.Sprite.idle);
		}
	}
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
			this.guiUpdater({
				fps: (1 / dt) * 60,
				command: this.player.Commands.mode,
				food: this.player.Resources.food
			});
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
