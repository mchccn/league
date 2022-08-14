import { Bodies, Composite, Engine, Render, Runner } from "matter-js";
import { Camera } from "./engine/Camera";
import { Character } from "./engine/Character";
import { Player } from "./engine/Player";
import { setEngine } from "./help/engines";
import { setKeybinds } from "./help/keybinds";
import { setSettings } from "./help/settings";
import { Keybinds } from "./managers/Keybinds";
import { Settings } from "./managers/Settings";
import { SettingsMenu } from "./menus/settings";

const canvas = document.querySelector("canvas")!;

const engine = setEngine(Engine.create());

const render = Render.create({
    canvas,
    engine,
    options: {
        pixelRatio: devicePixelRatio,
        width: window.innerWidth,
        height: window.innerHeight,
        hasBounds: true,
    },
});

engine.gravity = { scale: 0, x: 0, y: 0 };

engine.render = render;

new SettingsMenu("settingsicon", "settingsmenu", "inactivemenu");

setKeybinds(new Keybinds());

setSettings(
    new Settings("kelsny.league.settings", {
        cameraMoveSpeed: 10,
        cameraZoomSpeed: 0.025,
        cameraMoveTriggerSize: 10,
    }).whenSet("cameraMoveTriggerSize", (size) => {
        document.body.style.setProperty("--camera-move-trigger-size", size + "px");
    })
);

const character = new Character(Bodies.circle(100, 100, 25, { restitution: 0 }), {
    baseAbilityHaste: 0,
    baseAbilityPower: 0,
    baseArmor: 0,
    baseAttackDamage: 0,
    baseAttackSpeed: 0,
    baseEnergy: 0,
    baseEnergyRegen: 0,
    baseHealth: 0,
    baseHealthRegen: 0,
    baseMagicResist: 0,
    baseMana: 0,
    baseManaRegen: 0,
    baseMoveSpeed: 250,
    baseSize: 25,
});

const player = new Player(character);

const camera = new Camera(player);

const terrain = [Bodies.polygon(200, 200, 9, 100, { isStatic: true })];

Composite.add(engine.world, [character.body, ...terrain]);

Render.run(render);

const runner = Runner.create();

Runner.run(runner, engine);
