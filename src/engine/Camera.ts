import { Events, Render, Vector } from "matter-js";
import { getEngine } from "../help/engines";
import { getKeybinds } from "../help/keybinds";
import { getSettings } from "../help/settings";
import { Player } from "./Player";

export class Camera {
    player: Player;

    #engine = getEngine();
    #keybinds = getKeybinds();
    #settings = getSettings();

    #locked = false;

    #moving = {
        top: false,
        right: false,
        bottom: false,
        left: false,
    };

    #zoom = 1;

    constructor(player: Player) {
        this.player = player;

        (Object.keys(this.#moving) as ("top" | "right" | "bottom" | "left")[]).forEach((key, i, a) => {
            document.getElementById(key)!.addEventListener("mouseover", () => {
                this.#moving[key] = true;
            });

            document.getElementById(key)!.addEventListener("mouseout", () => {
                this.#moving[key] = false;
            });

            document.getElementById(key + (a[i + 1] ?? a[0]))!.addEventListener("mouseover", () => {
                this.#moving[key] = true;
                this.#moving[a[i + 1] ?? a[0]] = true;
            });

            document.getElementById(key + (a[i + 1] ?? a[0]))!.addEventListener("mouseout", () => {
                this.#moving[key] = false;
                this.#moving[a[i + 1] ?? a[0]] = false;
            });
        });

        Events.on(this.#engine, "beforeUpdate", () => {
            if (this.#locked) {
                const width = this.#engine.render.bounds.max.x - this.#engine.render.bounds.min.x;
                const height = this.#engine.render.bounds.max.y - this.#engine.render.bounds.min.y;

                this.#engine.render.bounds.min.x = this.player.character.body.position.x - width / 2;
                this.#engine.render.bounds.min.y = this.player.character.body.position.y - height / 2;

                this.#engine.render.bounds.max.x = this.#engine.render.bounds.min.x + width;
                this.#engine.render.bounds.max.y = this.#engine.render.bounds.min.y + height;
            } else {
                if (this.#moving.left || this.#keybinds.isKeyDown("ArrowLeft")) {
                    this.#engine.render.bounds.min.x -= this.#settings.get("cameraMoveSpeed");
                    this.#engine.render.bounds.max.x -= this.#settings.get("cameraMoveSpeed");
                }

                if (this.#moving.right || this.#keybinds.isKeyDown("ArrowRight")) {
                    this.#engine.render.bounds.min.x += this.#settings.get("cameraMoveSpeed");
                    this.#engine.render.bounds.max.x += this.#settings.get("cameraMoveSpeed");
                }

                if (this.#moving.top || this.#keybinds.isKeyDown("ArrowUp")) {
                    this.#engine.render.bounds.min.y -= this.#settings.get("cameraMoveSpeed");
                    this.#engine.render.bounds.max.y -= this.#settings.get("cameraMoveSpeed");
                }

                if (this.#moving.bottom || this.#keybinds.isKeyDown("ArrowDown")) {
                    this.#engine.render.bounds.min.y += this.#settings.get("cameraMoveSpeed");
                    this.#engine.render.bounds.max.y += this.#settings.get("cameraMoveSpeed");
                }
            }
        });

        document.addEventListener("wheel", (e) => {
            this.#zoom = Math.max(
                Math.min(
                    this.#zoom +
                        (e.deltaY > 0 ? -this.#settings.get("cameraZoomSpeed") : this.#settings.get("cameraZoomSpeed")),
                    1
                ),
                0.333
            );

            const singularity = Vector.create(
                this.#engine.render.bounds.min.x +
                    (this.#engine.render.bounds.max.x - this.#engine.render.bounds.min.x) / 2,
                this.#engine.render.bounds.min.y +
                    (this.#engine.render.bounds.max.y - this.#engine.render.bounds.min.y) / 2
            );

            const original = Vector.div(
                Vector.create(this.#engine.render.canvas.width, this.#engine.render.canvas.height),
                this.#engine.render.options.pixelRatio ?? window.devicePixelRatio
            );

            Render.lookAt(
                this.#engine.render,
                {
                    bounds: { min: singularity, max: singularity },
                    position: singularity,
                },
                Vector.mult(Vector.div(original, 2), this.#zoom)
            );
        });

        this.#keybinds
            .onKeyPress("Space", () => {
                const width = this.#engine.render.bounds.max.x - this.#engine.render.bounds.min.x;
                const height = this.#engine.render.bounds.max.y - this.#engine.render.bounds.min.y;

                this.#engine.render.bounds.min.x = this.player.character.body.position.x - width / 2;
                this.#engine.render.bounds.min.y = this.player.character.body.position.y - height / 2;

                this.#engine.render.bounds.max.x = this.#engine.render.bounds.min.x + width;
                this.#engine.render.bounds.max.y = this.#engine.render.bounds.min.y + height;
            })
            .onKeyPress("KeyY", () => {
                if (!this.#locked) {
                    const width = this.#engine.render.bounds.max.x - this.#engine.render.bounds.min.x;
                    const height = this.#engine.render.bounds.max.y - this.#engine.render.bounds.min.y;

                    this.#engine.render.bounds.min.x = this.player.character.body.position.x - width / 2;
                    this.#engine.render.bounds.min.y = this.player.character.body.position.y - height / 2;

                    this.#engine.render.bounds.max.x = this.#engine.render.bounds.min.x + width;
                    this.#engine.render.bounds.max.y = this.#engine.render.bounds.min.y + height;

                    this.#locked = true;
                } else this.#locked = false;
            });
    }
}
