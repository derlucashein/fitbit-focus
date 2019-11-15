import * as fs from "fs";

const CONFIG_FILENAME = "config.txt";
const APP_STATE_FILENAME = "app-state.txt";
import * as Keys from "../shared/keys";

export default class FileHelper {

    constructor() {
        //TODO change
        if (!fs.existsSync(CONFIG_FILENAME)) {
            this.saveConfig({
                "pomodoroInMinutes": 25,
                "shortBreakInMinutes": 5,
                "longBreakInMinutes": 15,
                "color": "tomato"
            });
        }
        
        if (!fs.existsSync(APP_STATE_FILENAME)) {
            this.saveAppState({
                "sessions": 0,
                "currentMode": Keys.SESSION,
            });
        }
        
    }

    saveConfig(config) {
        fs.writeFileSync(CONFIG_FILENAME, config, "cbor");
    }

    loadConfig() {
        return fs.readFileSync(CONFIG_FILENAME, "cbor");;
    }

    saveAppState(state) {
        let json_data = {
            "sessions": state.sessions,
            "currentMode": state.currentMode
        }
        fs.writeFileSync(APP_STATE_FILENAME, json_data, "cbor");
    }

    loadAppState() {
        return fs.readFileSync(APP_STATE_FILENAME, "cbor");
    }
}