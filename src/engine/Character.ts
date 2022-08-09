import { Body } from "matter-js";
import { Entity } from "./Entity";

export class Character extends Entity {
    readonly body: Body;

    #baseSize: number;
    #baseHealth: number;
    #baseMana: number;
    #baseEnergy: number;
    #baseHealthRegen: number;
    #baseManaRegen: number;
    #baseEnergyRegen: number;
    #baseAttackDamage: number;
    #baseAbilityPower: number;
    #baseArmor: number;
    #baseMagicResist: number;
    #baseAbilityHaste: number;
    #baseAttackSpeed: number;
    #baseMoveSpeed: number;

    #currentHealth: number;
    #currentMana: number;
    #currentEnergy: number;

    constructor(
        body: Body,
        stats: {
            baseSize: number;
            baseHealth: number;
            baseMana: number;
            baseEnergy: number;
            baseHealthRegen: number;
            baseManaRegen: number;
            baseEnergyRegen: number;
            baseAttackDamage: number;
            baseAbilityPower: number;
            baseArmor: number;
            baseMagicResist: number;
            baseAbilityHaste: number;
            baseAttackSpeed: number;
            baseMoveSpeed: number;
        },
    ) {
        super();

        this.body = body;

        this.#baseSize = stats.baseSize;
        this.#baseHealth = stats.baseHealth;
        this.#baseMana = stats.baseMana;
        this.#baseEnergy = stats.baseEnergy;
        this.#baseHealthRegen = stats.baseHealthRegen;
        this.#baseManaRegen = stats.baseManaRegen;
        this.#baseEnergyRegen = stats.baseEnergyRegen;
        this.#baseAttackDamage = stats.baseAttackDamage;
        this.#baseAbilityPower = stats.baseAbilityPower;
        this.#baseArmor = stats.baseArmor;
        this.#baseMagicResist = stats.baseMagicResist;
        this.#baseAbilityHaste = stats.baseAbilityHaste;
        this.#baseAttackSpeed = stats.baseAttackSpeed;
        this.#baseMoveSpeed = stats.baseMoveSpeed;

        this.#currentHealth = stats.baseHealth;
        this.#currentMana = stats.baseMana;
        this.#currentEnergy = stats.baseEnergy;
    }

    get baseSize() {
        return this.#baseSize;
    }

    get size() {
        return this.baseSize;
    }

    get baseHealth() {
        return this.#baseHealth;
    }

    get currentHealth() {
        return this.#currentHealth;
    }

    get maxHealth() {
        return this.baseHealth;
    }

    get baseMana() {
        return this.#baseMana;
    }

    get currentMana() {
        return this.#currentMana;
    }

    get maxMana() {
        return this.#baseMana;
    }

    get baseEnergy() {
        return this.#baseEnergy;
    }

    get currentEnergy() {
        return this.#currentEnergy;
    }

    get maxEnergy() {
        return this.#baseEnergy;
    }

    get baseHealthRegen() {
        return this.#baseHealthRegen;
    }

    get healthRegen() {
        return this.baseHealthRegen;
    }

    get baseManaRegen() {
        return this.#baseManaRegen;
    }

    get manaRegen() {
        return this.baseManaRegen;
    }

    get baseEnergyRegen() {
        return this.#baseEnergyRegen;
    }

    get energyRegen() {
        return this.baseEnergyRegen;
    }

    get flatArmorPen() {
        return 0;
    }

    get armorPen() {
        return 0;
    }

    get flatMagicPen() {
        return 0;
    }

    get magicPen() {
        return 0;
    }

    get lifesteal() {
        return 0;
    }

    get baseAttackDamage() {
        return this.#baseAttackDamage;
    }

    get attackDamage() {
        return this.baseAttackDamage;
    }

    get baseAbilityPower() {
        return this.#baseAbilityPower;
    }

    get abilityPower() {
        return this.baseAbilityPower;
    }

    get baseArmor() {
        return this.#baseArmor;
    }

    get armor() {
        return this.baseArmor;
    }

    get baseMagicResist() {
        return this.#baseMagicResist;
    }

    get magicResist() {
        return this.baseMagicResist;
    }

    get baseAttackSpeed() {
        return this.#baseAttackSpeed;
    }

    get attackSpeed() {
        return this.baseAttackSpeed;
    }

    get baseAbilityHaste() {
        return this.#baseAbilityHaste;
    }

    get abilityHaste() {
        return this.baseAbilityHaste;
    }

    get baseMoveSpeed() {
        return this.#baseMoveSpeed;
    }

    get moveSpeed() {
        return this.baseMoveSpeed;
    }

    get critChance() {
        return 0;
    }
}
