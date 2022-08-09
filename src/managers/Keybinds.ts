export class Keybinds {
    #keymap = new Map<
        string,
        {
            isPressed: boolean;
            timestamp: number;
        }
    >();

    #keypresses = new Map<string, ((e: KeyboardEvent) => void)[]>();
    #keydowns = new Map<string, ((e: KeyboardEvent) => void)[]>();
    #keychords = new Map<string, ((keys: { isPressed: boolean; timestamp: number }[]) => void)[]>();

    constructor() {
        document.addEventListener("keypress", (e) => {
            this.#keypresses.get(e.code)?.forEach((run) => {
                run.call(undefined, e);
            });
        });

        document.addEventListener("keydown", (e) => {
            this.#keydowns.get(e.code)?.forEach((run) => {
                run.call(undefined, e);
            });

            if (!this.#keymap.get(e.code)?.isPressed)
                this.#keymap.set(e.code, {
                    isPressed: true,
                    timestamp: Date.now(),
                });

            this.#keychords.forEach((runs, chord) => {
                if (chord.split("+").every((key) => this.#keymap.get(key)?.isPressed))
                    runs.forEach((run) => {
                        run.call(
                            undefined,
                            chord.split("+").map((key) => this.#keymap.get(key)!),
                        );
                    });
            });
        });

        document.addEventListener("keyup", (e) => {
            this.#keymap.set(e.code, {
                isPressed: false,
                timestamp: Date.now(),
            });
        });
    }

    onKeyPress(key: string, run: (e: KeyboardEvent) => void) {
        this.#keypresses.set(key, (this.#keypresses.get(key) ?? []).concat(run));

        return this;
    }

    onKeyDown(key: string, run: (e: KeyboardEvent) => void) {
        this.#keydowns.set(key, (this.#keydowns.get(key) ?? []).concat(run));

        return this;
    }

    onKeyChord(chord: string, run: (keys: { isPressed: boolean; timestamp: number }[]) => void) {
        chord = chord.split("+").sort().join("+");

        this.#keychords.set(chord, (this.#keychords.get(chord) ?? []).concat(run));

        return this;
    }

    isKeyDown(key: string) {
        return !!this.#keymap.get(key)?.isPressed;
    }
}
