import { Engine } from "matter-js";

let engine!: Engine;

export const getEngine = () => engine;

export const useEngine = (e: Engine) => (engine = e);
