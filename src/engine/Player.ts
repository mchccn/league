import { Body, Events, Vector } from "matter-js";
import { getEngine } from "../help/engines";
import { Character } from "./Character";

export class Player {
    character: Character;

    destination: Vector;

    #engine = getEngine();

    constructor(character: Character) {
        this.character = character;

        this.destination = Vector.clone(this.character.body.position);

        Events.on(this.#engine, "beforeUpdate", () => {
            const d = Vector.sub(this.character.body.position, this.destination);

            const m = Vector.mult(Vector.normalise(d), this.character.moveSpeed / 100);

            Body.setPosition(
                this.character.body,
                Vector.sub(
                    this.character.body.position,
                    Vector.magnitude(m) > Vector.magnitude(d) ? d : m,
                ),
            );

            if (Vector.magnitude(Vector.sub(this.character.body.position, this.destination)) < 0.5)
                this.character.body.position = Vector.clone(this.destination);
        });
    }
}
