import { Body } from "matter-js";

export abstract class Entity {
    abstract body: Body;

    constructor() {}
}
