export class Settings<T extends Record<string, string | number | boolean>> {
    #key: string;

    #settings: T;

    constructor(key: string, defaults: T) {
        this.#key = key;

        this.#settings = defaults;

        const data = localStorage.getItem(key);

        if (data) {
            try {
                const json = JSON.parse(data);

                if (
                    !Object.keys(defaults).every(
                        (key) => Object.hasOwn(json, key) && typeof json[key] === typeof defaults[key]
                    )
                )
                    this.write();
                else this.#settings = json;
            } catch {
                this.write();
            }
        } else this.write();
    }

    write() {
        const string = JSON.stringify(this.#settings);

        localStorage.setItem(this.#key, string);

        return this;
    }

    get(key: keyof T) {
        return this.#settings[key];
    }

    set<K extends keyof T>(key: K, value: T[K]) {
        try {
            this.#settings[key] = value;

            return value;
        } finally {
            this.write();
        }
    }
}
