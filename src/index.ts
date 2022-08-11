import { Bodies, Composite, Engine, Render, Runner } from "matter-js";
import { Camera } from "./engine/Camera";
import { Character } from "./engine/Character";
import { Player } from "./engine/Player";
import { useEngine } from "./help/engines";
import { useKeybinds } from "./help/keybinds";
import { Keybinds } from "./managers/Keybinds";

const querySelector = document.querySelector.bind(document);

const canvas = querySelector("canvas")!;

const engine = useEngine(Engine.create());

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

const keybinds = useKeybinds(new Keybinds());

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
