import { Keybinds } from "../managers/Keybinds";

let keybinds!: Keybinds;

export const getKeybinds = () => keybinds;

export const useKeybinds = (k: Keybinds) => (keybinds = k);
