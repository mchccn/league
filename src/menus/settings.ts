export class SettingsMenu {
    #toggleId: string;
    #menuId: string;
    #inactiveClass: string;

    #shown = false;

    constructor(toggleId: string, menuId: string, inactiveClass: string) {
        this.#toggleId = toggleId;
        this.#menuId = menuId;
        this.#inactiveClass = inactiveClass;

        const menu = document.getElementById(this.#menuId)!;

        menu.classList.add(this.#inactiveClass);

        document.getElementById(this.#toggleId)!.addEventListener("click", () => {
            menu.classList.toggle(this.#inactiveClass);
        });
    }

    get shown() {
        return this.#shown;
    }
}
