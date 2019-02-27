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

		this.pause = false;
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

			.add("../assets/units/gungirl.json")
			.add("../assets/units/player.json")
			.add("../assets/units/cat.json")
			.add("../assets/units/dog.json")
			.add("../assets/units/dino.json")
			.add("../assets/units/jack.json")
			.add("../assets/units/knight.json")
			.add("../assets/units/ninjagirl.json")
			.add("../assets/units/ninjaman.json")
			.add("../assets/units/robot.json")
			.add("../assets/units/zombiefemale.json")
			.add("../assets/units/zombiemale.json")
			.add("../assets/units/boy.json")

			.add("../assets/campfire.json")

			.add("building-01", "../assets/building-01.png")

			.add("desert1-1", "../assets/desert/1/1.png")
			.add("desert1-2", "../assets/desert/1/2.png")
			.add("desert1-3", "../assets/desert/1/3.png")
			.add("desert1-4", "../assets/desert/1/4.png")
			.add("desert1-5", "../assets/desert/1/5.png")

			.add("desert2-1", "../assets/desert/2/1.png")
			.add("desert2-2", "../assets/desert/2/2.png")
			.add("desert2-3", "../assets/desert/2/3.png")
			.add("desert2-4", "../assets/desert/2/4.png")
			.add("desert2-5", "../assets/desert/2/5.png")

			.add("desert3-1", "../assets/desert/3/1.png")
			.add("desert3-2", "../assets/desert/3/2.png")
			.add("desert3-3", "../assets/desert/3/3.png")
			.add("desert3-4", "../assets/desert/3/4.png")
			.add("desert3-5", "../assets/desert/3/5.png")

			.add("desert4-1", "../assets/desert/4/1.png")
			.add("desert4-2", "../assets/desert/4/2.png")
			.add("desert4-3", "../assets/desert/4/3.png")
			.add("desert4-4", "../assets/desert/4/4.png")
			.add("desert4-5", "../assets/desert/4/5.png")

			.add("mountain-1", "../assets/Hills-Layer-01.png")
			.add("mountain-2", "../assets/Hills-Layer-02.png")
			.add("mountain-3", "../assets/Hills-Layer-03.png")
			.add("mountain-4", "../assets/Hills-Layer-04.png")
			.add("mountain-5", "../assets/Hills-Layer-05.png")
			.add("mountain-6", "../assets/Hills-Layer-06.png")

			.load(this.onAssetLoaded);
	}

	onAssetLoaded = () => {
		//Gungirl
		this.spritesObj.gungirlWalkFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.gungirlWalkFrames.push(
				PIXI.Texture.fromFrame("gungirl Run (" + i + ").png")
			);
		}
		this.spritesObj.gungirlAttackFrames = [];
		for (let i = 1; i <= 3; i++) {
			this.spritesObj.gungirlAttackFrames.push(
				PIXI.Texture.fromFrame("gungirl Shoot (" + i + ").png")
			);
		}
		this.spritesObj.gungirlDeathFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.gungirlDeathFrames.push(
				PIXI.Texture.fromFrame("gungirl Dead (" + i + ").png")
			);
		}
		this.spritesObj.gungirlIdleFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.gungirlIdleFrames.push(
				PIXI.Texture.fromFrame("gungirl Idle (" + i + ").png")
			);
		}
		//Player
		this.spritesObj.playerWalkFrames = [];
		for (let i = 0; i <= 9; i++) {
			this.spritesObj.playerWalkFrames.push(
				PIXI.Texture.fromFrame("player Run__00" + i + ".png")
			);
		}

		this.spritesObj.playerIdleFrames = [];
		for (let i = 0; i <= 9; i++) {
			this.spritesObj.playerIdleFrames.push(
				PIXI.Texture.fromFrame("player Idle__00" + i + ".png")
			);
		}

		this.spritesObj.playerAttackFrames = [];
		for (let i = 0; i <= 9; i++) {
			this.spritesObj.playerAttackFrames.push(
				PIXI.Texture.fromFrame("player Slide__00" + i + ".png")
			);
		}

		this.spritesObj.playerDeathFrames = [];
		for (let i = 0; i <= 4; i++) {
			this.spritesObj.playerDeathFrames.push(
				PIXI.Texture.fromFrame("player Dead__00" + i + ".png")
			);
		}
		//cat
		this.spritesObj.catWalkFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.catWalkFrames.push(
				PIXI.Texture.fromFrame("cat Run (" + i + ").png")
			);
		}

		this.spritesObj.catIdleFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.catIdleFrames.push(
				PIXI.Texture.fromFrame("cat Idle (" + i + ").png")
			);
		}

		this.spritesObj.catAttackFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.catAttackFrames.push(
				PIXI.Texture.fromFrame("cat Jump (" + i + ").png")
			);
		}

		this.spritesObj.catDeathFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.catDeathFrames.push(
				PIXI.Texture.fromFrame("cat Dead (" + i + ").png")
			);
		}
		//dino
		this.spritesObj.dinoWalkFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.dinoWalkFrames.push(
				PIXI.Texture.fromFrame("dino Run (" + i + ").png")
			);
		}

		this.spritesObj.dinoIdleFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.dinoIdleFrames.push(
				PIXI.Texture.fromFrame("dino Idle (" + i + ").png")
			);
		}

		this.spritesObj.dinoAttackFrames = [];
		for (let i = 1; i <= 12; i++) {
			this.spritesObj.dinoAttackFrames.push(
				PIXI.Texture.fromFrame("dino Jump (" + i + ").png")
			);
		}

		this.spritesObj.dinoDeathFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.dinoDeathFrames.push(
				PIXI.Texture.fromFrame("dino Dead (" + i + ").png")
			);
		}
		//dog
		this.spritesObj.dogWalkFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.dogWalkFrames.push(
				PIXI.Texture.fromFrame("dog Run (" + i + ").png")
			);
		}

		this.spritesObj.dogIdleFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.dogIdleFrames.push(
				PIXI.Texture.fromFrame("dog Idle (" + i + ").png")
			);
		}

		this.spritesObj.dogAttackFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.dogAttackFrames.push(
				PIXI.Texture.fromFrame("dog Jump (" + i + ").png")
			);
		}

		this.spritesObj.dogDeathFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.dogDeathFrames.push(
				PIXI.Texture.fromFrame("dog Dead (" + i + ").png")
			);
		}
		//jack
		this.spritesObj.jackWalkFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.jackWalkFrames.push(
				PIXI.Texture.fromFrame("jack Run (" + i + ").png")
			);
		}

		this.spritesObj.jackIdleFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.jackIdleFrames.push(
				PIXI.Texture.fromFrame("jack Idle (" + i + ").png")
			);
		}

		this.spritesObj.jackAttackFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.jackAttackFrames.push(
				PIXI.Texture.fromFrame("jack Slide (" + i + ").png")
			);
		}

		this.spritesObj.jackDeathFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.jackDeathFrames.push(
				PIXI.Texture.fromFrame("jack Dead (" + i + ").png")
			);
		}
		//knight
		this.spritesObj.knightWalkFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.knightWalkFrames.push(
				PIXI.Texture.fromFrame("knight Run (" + i + ").png")
			);
		}

		this.spritesObj.knightIdleFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.knightIdleFrames.push(
				PIXI.Texture.fromFrame("knight Idle (" + i + ").png")
			);
		}

		this.spritesObj.knightAttackFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.knightAttackFrames.push(
				PIXI.Texture.fromFrame("knight Attack (" + i + ").png")
			);
		}

		this.spritesObj.knightDeathFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.knightDeathFrames.push(
				PIXI.Texture.fromFrame("knight Dead (" + i + ").png")
			);
		}
		//ninjagirl
		this.spritesObj.ninjagirlWalkFrames = [];
		for (let i = 0; i <= 9; i++) {
			this.spritesObj.ninjagirlWalkFrames.push(
				PIXI.Texture.fromFrame("ninjagirl Run__00" + i + ".png")
			);
		}

		this.spritesObj.ninjagirlIdleFrames = [];
		for (let i = 0; i <= 9; i++) {
			this.spritesObj.ninjagirlIdleFrames.push(
				PIXI.Texture.fromFrame("ninjagirl Idle__00" + i + ".png")
			);
		}

		this.spritesObj.ninjagirlAttackFrames = [];
		for (let i = 0; i <= 9; i++) {
			this.spritesObj.ninjagirlAttackFrames.push(
				PIXI.Texture.fromFrame("ninjagirl Attack__00" + i + ".png")
			);
		}

		this.spritesObj.ninjagirlDeathFrames = [];
		for (let i = 0; i <= 9; i++) {
			this.spritesObj.ninjagirlDeathFrames.push(
				PIXI.Texture.fromFrame("ninjagirl Dead__00" + i + ".png")
			);
		}
		//ninjaman
		this.spritesObj.ninjamanWalkFrames = [];
		for (let i = 0; i <= 9; i++) {
			this.spritesObj.ninjamanWalkFrames.push(
				PIXI.Texture.fromFrame("ninjaman Run__00" + i + ".png")
			);
		}

		this.spritesObj.ninjamanIdleFrames = [];
		for (let i = 0; i <= 9; i++) {
			this.spritesObj.ninjamanIdleFrames.push(
				PIXI.Texture.fromFrame("ninjaman Idle__00" + i + ".png")
			);
		}

		this.spritesObj.ninjamanAttackFrames = [];
		for (let i = 0; i <= 9; i++) {
			this.spritesObj.ninjamanAttackFrames.push(
				PIXI.Texture.fromFrame("ninjaman Attack__00" + i + ".png")
			);
		}

		this.spritesObj.ninjamanDeathFrames = [];
		for (let i = 0; i <= 9; i++) {
			this.spritesObj.ninjamanDeathFrames.push(
				PIXI.Texture.fromFrame("ninjaman Dead__00" + i + ".png")
			);
		}
		//robot
		this.spritesObj.robotWalkFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.robotWalkFrames.push(
				PIXI.Texture.fromFrame("robot Run (" + i + ").png")
			);
		}

		this.spritesObj.robotIdleFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.robotIdleFrames.push(
				PIXI.Texture.fromFrame("robot Idle (" + i + ").png")
			);
		}

		this.spritesObj.robotAttackFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.robotAttackFrames.push(
				PIXI.Texture.fromFrame("robot Melee (" + i + ").png")
			);
		}

		this.spritesObj.robotDeathFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.robotDeathFrames.push(
				PIXI.Texture.fromFrame("robot Dead (" + i + ").png")
			);
		}
		//zombie female
		this.spritesObj.zombiefemaleWalkFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.zombiefemaleWalkFrames.push(
				PIXI.Texture.fromFrame("zombiefemale Walk (" + i + ").png")
			);
		}

		this.spritesObj.zombiefemaleIdleFrames = [];
		for (let i = 1; i <= 15; i++) {
			this.spritesObj.zombiefemaleIdleFrames.push(
				PIXI.Texture.fromFrame("zombiefemale Idle (" + i + ").png")
			);
		}

		this.spritesObj.zombiefemaleAttackFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.zombiefemaleAttackFrames.push(
				PIXI.Texture.fromFrame("zombiefemale Attack (" + i + ").png")
			);
		}

		this.spritesObj.zombiefemaleDeathFrames = [];
		for (let i = 1; i <= 12; i++) {
			this.spritesObj.zombiefemaleDeathFrames.push(
				PIXI.Texture.fromFrame("zombiefemale Dead (" + i + ").png")
			);
		}
		//zombiemale
		this.spritesObj.zombiemaleWalkFrames = [];
		for (let i = 1; i <= 10; i++) {
			this.spritesObj.zombiemaleWalkFrames.push(
				PIXI.Texture.fromFrame("zombiemale Walk (" + i + ").png")
			);
		}

		this.spritesObj.zombiemaleIdleFrames = [];
		for (let i = 1; i <= 15; i++) {
			this.spritesObj.zombiemaleIdleFrames.push(
				PIXI.Texture.fromFrame("zombiemale Idle (" + i + ").png")
			);
		}

		this.spritesObj.zombiemaleAttackFrames = [];
		for (let i = 1; i <= 8; i++) {
			this.spritesObj.zombiemaleAttackFrames.push(
				PIXI.Texture.fromFrame("zombiemale Attack (" + i + ").png")
			);
		}

		this.spritesObj.zombiemaleDeathFrames = [];
		for (let i = 1; i <= 12; i++) {
			this.spritesObj.zombiemaleDeathFrames.push(
				PIXI.Texture.fromFrame("zombiemale Dead (" + i + ").png")
			);
		}
		//boy
		this.spritesObj.boyWalkFrames = [];
		for (let i = 1; i <= 15; i++) {
			this.spritesObj.boyWalkFrames.push(
				PIXI.Texture.fromFrame("boy Run (" + i + ").png")
			);
		}

		this.spritesObj.boyIdleFrames = [];
		for (let i = 1; i <= 15; i++) {
			this.spritesObj.boyIdleFrames.push(
				PIXI.Texture.fromFrame("boy Idle (" + i + ").png")
			);
		}

		this.spritesObj.boyAttackFrames = [];
		for (let i = 1; i <= 15; i++) {
			this.spritesObj.boyAttackFrames.push(
				PIXI.Texture.fromFrame("boy Jump (" + i + ").png")
			);
		}

		this.spritesObj.boyDeathFrames = [];
		for (let i = 1; i <= 15; i++) {
			this.spritesObj.boyDeathFrames.push(
				PIXI.Texture.fromFrame("boy Dead (" + i + ").png")
			);
		}
		//CAMPFIRE
		this.spritesObj.campfireFrames = [];
		for (let i = 1; i <= 5; i++) {
			this.spritesObj.campfireFrames.push(
				PIXI.Texture.fromFrame("campfire-" + i + ".png")
			);
		}
		//building
		this.spritesObj.buildingFrames = [];
		for (let i = 1; i <= 2; i++) {
			this.spritesObj.buildingFrames.push(
				PIXI.Texture.fromFrame("building-01")
			);
		}

		this.generateLevel();
	};

	generateLevel = () => {
		// for (let i = 0; i < 10; i++) {
		// 	let spawnPos = i * 2000;
		// 	let building = new Entity();
		// 	building.addComponent(new Components.Position(spawnPos, 220));
		// 	building.addComponent(new Components.Size(32, 32));
		// 	building.addComponent(new Components.Faction("enemy"));
		// 	building.addComponent(
		// 		new Components.Sprite(
		// 			new PIXI.extras.AnimatedSprite(this.spritesObj.buildingFrames)
		// 		)
		// 	);
		// 	this.buildingArr.push(building);
		// }

		//spawn camp(base)
		for (let i = 0; i < 3; i++) {
			let spawnPos = i * 2400 + 100;
			let campfire = new Entity();
			campfire.addComponent(new Components.Position(spawnPos, 590));
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
		if (!this.player) {
			this.player = new Entity();
			this.player.addComponent(new Components.Position(50, 590));
			this.player.addComponent(new Components.Weapon());
			this.player.addComponent(new Components.Size(32, 32));
			this.player.addComponent(new Components.Velocity(5));

			this.player.addComponent(new Components.Stats());
			this.player.addComponent(new Components.Resources());

			this.player.addComponent(new Components.Commands());
			this.player.addComponent(new Components.Movement());
			this.player.addComponent(new Components.Faction("player"));
			this.player.addComponent(
				new Components.Sprite(
					new PIXI.extras.AnimatedSprite(this.spritesObj.playerIdleFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.playerWalkFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.playerAttackFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.playerDeathFrames)
				)
			);
			this.playerUnitArr.push(this.player);
		}

		//spawn animals
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 3; j++) {
				let animal = new Entity();
				let spawnPos = Math.random() * 200 + 1000 + 2000 * i;

				animal.addComponent(new Components.Position(spawnPos, 590));
				animal.addComponent(new Components.Weapon("paws", "melee", 10, 1));
				animal.addComponent(new Components.Size(100, 100));
				animal.addComponent(new Components.Velocity(Math.random() * 1 + 1));

				animal.addComponent(new Components.Stats());
				animal.addComponent(new Components.Behaviour(spawnPos));

				animal.addComponent(new Components.Movement());
				animal.addComponent(new Components.Faction("animal"));
				let rand = Math.random();
				if (rand < 0.1) {
					animal.Weapon.damage = 25;
					animal.addComponent(
						new Components.Sprite(
							new PIXI.extras.AnimatedSprite(this.spritesObj.dinoIdleFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.dinoWalkFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.dinoAttackFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.dinoDeathFrames)
						)
					);
				} else if (rand < 0.5) {
					animal.addComponent(
						new Components.Sprite(
							new PIXI.extras.AnimatedSprite(this.spritesObj.catIdleFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.catWalkFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.catAttackFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.catDeathFrames)
						)
					);
				} else {
					animal.addComponent(
						new Components.Sprite(
							new PIXI.extras.AnimatedSprite(this.spritesObj.dogIdleFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.dogWalkFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.dogAttackFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.dogDeathFrames)
						)
					);
				}
				console.log(animal);
				this.npcUnitArr.push(animal);
			}
		}
		//	spawn Enemy
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < this.level+2; j++) {
				let skelly = new Entity();
				let spawnPos = Math.random() * 100 + 1600 + 2000 * i;

				skelly.addComponent(new Components.Position(spawnPos, 590));
				skelly.addComponent(new Components.Weapon("pikeaxe", "melee", 20, 25));
				skelly.addComponent(new Components.Size(32, 32));
				skelly.addComponent(new Components.Velocity(5));

				skelly.addComponent(new Components.Stats(100*this.level));
				skelly.addComponent(new Components.Behaviour(spawnPos));

				skelly.addComponent(new Components.Movement());
				skelly.addComponent(new Components.Faction("enemy"));
				if (this.level == 1) {
					skelly.addComponent(
						new Components.Sprite(
							new PIXI.extras.AnimatedSprite(this.spritesObj.jackIdleFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.jackWalkFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.jackAttackFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.jackDeathFrames)
						)
					);
				} else if (this.level == 2) {
					let rand = Math.random();
					if (rand < 0.5) {
						skelly.addComponent(
							new Components.Sprite(
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjamanIdleFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjamanWalkFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjamanAttackFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjamanDeathFrames
								)
							)
						);
					} else {
						skelly.addComponent(
							new Components.Sprite(
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjagirlIdleFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjagirlWalkFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjagirlAttackFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjagirlDeathFrames
								)
							)
						);
					}
				} else if (this.level == 3) {
					skelly.addComponent(
						new Components.Sprite(
							new PIXI.extras.AnimatedSprite(this.spritesObj.robotIdleFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.robotWalkFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.robotAttackFrames),
							new PIXI.extras.AnimatedSprite(this.spritesObj.robotDeathFrames)
						)
					);
				} else {
					let rand = Math.random();
					if (rand < 0.25) {
						skelly.addComponent(
							new Components.Sprite(
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjamanIdleFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjamanWalkFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjamanAttackFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjamanDeathFrames
								)
							)
						);
					} else if (rand < 0.5) {
						skelly.addComponent(
							new Components.Sprite(
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjagirlIdleFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjagirlWalkFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjagirlAttackFrames
								),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.ninjagirlDeathFrames
								)
							)
						);
					} else if (rand < 0.75) {
						skelly.addComponent(
							new Components.Sprite(
								new PIXI.extras.AnimatedSprite(this.spritesObj.robotIdleFrames),
								new PIXI.extras.AnimatedSprite(this.spritesObj.robotWalkFrames),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.robotAttackFrames
								),
								new PIXI.extras.AnimatedSprite(this.spritesObj.robotDeathFrames)
							)
						);
					} else {
						skelly.addComponent(
							new Components.Sprite(
								new PIXI.extras.AnimatedSprite(this.spritesObj.jackIdleFrames),
								new PIXI.extras.AnimatedSprite(this.spritesObj.jackWalkFrames),
								new PIXI.extras.AnimatedSprite(
									this.spritesObj.jackAttackFrames
								),
								new PIXI.extras.AnimatedSprite(this.spritesObj.jackDeathFrames)
							)
						);
					}
				}
				this.npcUnitArr.push(skelly);
			}
		}
		if (this.level === 1) {
			//Desert 1
			for (let i = 1; i <= 5; i++) {
				let texture = PIXI.Texture.fromFrame("desert1-" + i);
				let tilingSprite = new PIXI.extras.TilingSprite(texture, 1920, 1080);
				tilingSprite.scale.y = 768 / 1080;
				//	tilingSprite.y = -312;
				if (i < 5) {
					this.forestStage.addChild(tilingSprite);
				} else {
					this.foregroundStage.addChild(tilingSprite);
				}
				this.backgroundArr.forest.push(tilingSprite);
			}
		} else if (this.level === 2) {
			//Desert 2
			for (let i = 1; i <= 5; i++) {
				let texture = PIXI.Texture.fromFrame("desert2-" + i);
				let tilingSprite = new PIXI.extras.TilingSprite(texture, 1920, 1080);
				tilingSprite.y = 0;
				tilingSprite.scale.y = 768 / 1080;

				if (i < 5) {
					this.forestStage.addChild(tilingSprite);
				} else {
					this.foregroundStage.addChild(tilingSprite);
				}
				this.backgroundArr.forest.push(tilingSprite);
			}
		} else if (this.level === 3) {
			//Desert 3
			for (let i = 1; i <= 5; i++) {
				let texture = PIXI.Texture.fromFrame("desert3-" + i);
				let tilingSprite = new PIXI.extras.TilingSprite(texture, 1920, 1080);
				tilingSprite.y = 0;
				tilingSprite.scale.y = 768 / 1080;

				if (i < 5) {
					this.forestStage.addChild(tilingSprite);
				} else {
					this.foregroundStage.addChild(tilingSprite);
				}
				this.backgroundArr.forest.push(tilingSprite);
			}
		} else if (this.level === 4) {
			//Desert 4
			for (let i = 1; i <= 5; i++) {
				let texture = PIXI.Texture.fromFrame("desert4-" + i);
				let tilingSprite = new PIXI.extras.TilingSprite(texture, 1920, 1080);
				tilingSprite.y = 0;
				tilingSprite.scale.y = 768 / 1080;

				if (i < 5) {
					this.forestStage.addChild(tilingSprite);
				} else {
					this.foregroundStage.addChild(tilingSprite);
				}
				this.backgroundArr.forest.push(tilingSprite);
			}
		}

		// add objs to stage
		this.backgroundStage.addChild(this.forestStage);
		this.backgroundStage.addChild(this.mountainStage);
		this.backgroundStage.addChild(this.cityStage);

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

		this.stage.addChild(this.backgroundStage);
		this.stage.addChild(this.unitStage);
		this.stage.addChild(this.foregroundStage);

		this.loadSystems();
		this.allLoaded = true;
	};

	advanceLevel() {
		this.level++;
		this.buildingArr = [];
		//	this.playerUnitArr = [];
		this.npcUnitArr = [];
		console.log(this.stage);

		this.forestStage.removeChildren();
		this.mountainStage.removeChildren();
		this.cityStage.removeChildren();
		this.backgroundStage.removeChildren();
		this.foregroundStage.removeChildren();
		this.unitStage.removeChildren();
		this.stage.removeChildren();
		console.log(this.stage);

		for (let i in this.playerUnitArr) {
			this.playerUnitArr[i].Position.x = Math.random() * 50;
		}
		this.player.Position.x = 50;

		this.generateLevel();
		console.log(this.stage);
	}

	buyUnits(type) {
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
		if (targetCamp && this.player.Resources.food >= 10 && type == "boy") {
			this.player.Resources.food -= 10;

			let fren = new Entity();
			let spawnPos = targetCamp.Position.x;

			fren.addComponent(new Components.Position(spawnPos, 590));
			fren.addComponent(new Components.Weapon("fist", "melee", 10, 10));
			fren.addComponent(new Components.Size(32, 32));
			fren.addComponent(new Components.Velocity(5));

			fren.addComponent(new Components.Stats());
			fren.addComponent(
				new Components.Behaviour(spawnPos, 1000, 300, 25 + Math.random() * 50)
			);

			fren.addComponent(new Components.Movement());
			fren.addComponent(new Components.Faction("playerUnit"));
			fren.addComponent(
				new Components.Sprite(
					new PIXI.extras.AnimatedSprite(this.spritesObj.boyIdleFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.boyWalkFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.boyAttackFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.boyDeathFrames)
				)
			);
			this.playerUnitArr.push(fren);
			fren.Sprite.idle.animationSpeed = 0.2;
			fren.Sprite.idle.play();
			this.unitStage.addChild(fren.Sprite.idle);
		}
		if (targetCamp && this.player.Resources.food >= 25 && type == "gungirl") {
			this.player.Resources.food -= 25;

			let fren = new Entity();
			let spawnPos = targetCamp.Position.x;

			fren.addComponent(new Components.Position(spawnPos, 590));
			fren.addComponent(new Components.Weapon("gun", "range", 150, 5));
			fren.addComponent(new Components.Size(32, 32));
			fren.addComponent(new Components.Velocity(4));

			fren.addComponent(new Components.Stats(50));
			fren.addComponent(
				new Components.Behaviour(spawnPos, 1000, 300, 125 + Math.random() * 50)
			);

			fren.addComponent(new Components.Movement());
			fren.addComponent(new Components.Faction("playerUnit"));
			fren.addComponent(
				new Components.Sprite(
					new PIXI.extras.AnimatedSprite(this.spritesObj.gungirlIdleFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.gungirlWalkFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.gungirlAttackFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.gungirlDeathFrames)
				)
			);
			this.playerUnitArr.push(fren);
			fren.Sprite.idle.animationSpeed = 0.2;
			fren.Sprite.idle.play();
			this.unitStage.addChild(fren.Sprite.idle);
		}
		if (targetCamp && this.player.Resources.food >= 50 && type == "knight") {
			this.player.Resources.food -= 50;

			let fren = new Entity();
			let spawnPos = targetCamp.Position.x;

			fren.addComponent(new Components.Position(spawnPos, 590));
			fren.addComponent(new Components.Weapon("sword", "melee", 15, 20));
			fren.addComponent(new Components.Size(32, 32));
			fren.addComponent(new Components.Velocity(3));

			fren.addComponent(new Components.Stats(200));
			fren.addComponent(
				new Components.Behaviour(spawnPos, 1000, 300, Math.random() * 50)
			);

			fren.addComponent(new Components.Movement());
			fren.addComponent(new Components.Faction("playerUnit"));
			fren.addComponent(
				new Components.Sprite(
					new PIXI.extras.AnimatedSprite(this.spritesObj.knightIdleFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.knightWalkFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.knightAttackFrames),
					new PIXI.extras.AnimatedSprite(this.spritesObj.knightDeathFrames)
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

		//CHECK WIN/LOSE CONDItION
		if (this.player.Stats.health <= 0) {
			console.log("u lose");
		} else if (this.player.Position.x > 4900) {
			console.log("u win");
			this.advanceLevel();
		}
	}

	render() {
		//render stuff here
		this.renderer.render(this.stage);
		//		console.log(this.stage.children)
	}

	guiUpdater() {}

	mainLoop = () => {
		if (this.allLoaded && !this.pause) {
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
