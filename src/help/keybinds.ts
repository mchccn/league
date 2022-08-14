import { Keybinds } from "../managers/Keybinds";
import { getnset } from "./getnset";

export const [getKeybinds, setKeybinds] = getnset<Keybinds>();
