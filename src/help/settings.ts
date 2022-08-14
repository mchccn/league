import { Settings } from "../managers/Settings";
import { getnset } from "./getnset";

export type SettingsData = {
    cameraMoveSpeed: number;
    cameraZoomSpeed: number;
    cameraMoveTriggerSize: number;
};

export const [getSettings, setSettings] = getnset<Settings<SettingsData>>();
