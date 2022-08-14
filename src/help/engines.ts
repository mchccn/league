import { Engine } from "matter-js";
import { getnset } from "./getnset";

export const [getEngine, setEngine] = getnset<Engine>();
