import { Settings } from "../managers/Settings";

export type SettingsData = {
    cameraMoveSpeed: number;
    cameraZoomSpeed: number;
    cameraMoveTriggerSize: number;
};

let settings!: Settings<SettingsData>;

export const getSettings = () => settings;

export const useSettings = (s: Settings<SettingsData>) => (settings = s);
