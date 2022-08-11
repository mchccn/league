import { Body, Events, Vector } from "matter-js";
import { getEngine } from "../help/engines";
import { Character } from "./Character";

export class Player {
    character: Character;

    destinations: Vector[];

    #engine = getEngine();

    #rightClickButton = -1;

    #rightClickDragging = false;

    #lastUpdatedDestinations = Date.now();

    constructor(character: Character) {
        this.character = character;

        this.destinations = [];

        document.addEventListener("mouseup", (e) => {
            if (e.button === this.#rightClickButton) {
                this.#rightClickDragging = false;

                this.destinations.push(
                    Vector.create(
                        e.clientX + this.#engine.render.bounds.min.x,
                        e.clientY + this.#engine.render.bounds.min.y
                    )
                );
            }
        });

        document.addEventListener("mousemove", (e: MouseEvent) => {
            if (this.#rightClickDragging && Date.now() - this.#lastUpdatedDestinations > 100) {
                this.#lastUpdatedDestinations = Date.now();

                this.destinations.push(
                    Vector.create(
                        e.clientX + this.#engine.render.bounds.min.x,
                        e.clientY + this.#engine.render.bounds.min.y
                    )
                );
            }
        });

        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            this.#rightClickButton = e.button;

            this.#rightClickDragging = true;

            this.destinations = [];

            this.destinations.push(
                Vector.create(
                    e.clientX + this.#engine.render.bounds.min.x,
                    e.clientY + this.#engine.render.bounds.min.y
                )
            );
        });

        Events.on(this.#engine, "beforeUpdate", () => {
            if (this.destinations.length) {
                const d = Vector.sub(this.character.body.position, this.destinations[0]);

                const m = Vector.mult(Vector.normalise(d), this.character.moveSpeed / 100);

                Body.translate(this.character.body, Vector.neg(Vector.magnitude(m) > Vector.magnitude(d) ? d : m));

                // body slides for some reason???

                if (Vector.magnitude(Vector.sub(this.character.body.position, this.destinations[0])) < 0.5)
                    this.character.body.position = Vector.clone(this.destinations.shift()!);
            }
        });
    }
}
