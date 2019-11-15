import { vibration } from "haptics";
import { me } from "appbit";
import * as messaging from "messaging"

import Pomodoro from "./pomodoro";
import State from "./state";

import Storage from "./storage";

import UI from "./ui";
import * as Keys from "../shared/keys" ;

let storage = new Storage();
let config = storage.loadConfig();
let ui = new UI(config.color);

let onSessionsChanged = (sessions) => {
  ui.updateSessionsView(sessions);
}

let onModeChanged = (mode) => {
  let time = pomodoro.getCurrentTime();
  ui.toggleIconBreak(mode);
  ui.toggleStartPauseButtons(true);
  ui.updateTimerView(time);
}

let onTimerFinished = (sessions) => {
  vibration.start("ping");
  ui.updateSessionsView(sessions);
}

let onTick = (time) => {
  ui.updateTimerView(time);
}

ui.onStart = (e) => {
  vibration.start("confirmation");
  pomodoro.start();
  
}

ui.onPause = () => {
  vibration.start("confirmation");
  pomodoro.pause();
}

ui.onSkip= () => {
  vibration.start("confirmation");
  pomodoro.skip();
}

ui.onReset = () => {
  vibration.start("confirmation");
  pomodoro.reset();
}

let updateTimerUi = () => {
  let time = pomodoro.getCurrentTime();
  ui.updateTimerView(time);
  
  ui.updateSessionsView(pomodoro.state.getSessions());
}

let onPomodoroSettingsChange = () => {
  if (!pomodoro.isRunning) {
    updateTimerUi();
  }
  
}

//init
me.appTimeoutEnabled = false;
let appState = storage.loadAppState();
let state = new State(appState.currentMode, appState.sessions, onSessionsChanged, onModeChanged);
let pomodoro = new Pomodoro(
  config,
  state,
  onTick,
  onTimerFinished,
  
);

updateTimerUi();

me.onunload = (e) => {
  storage.saveAppState(pomodoro.state);
  storage.saveConfig(config);
}

messaging.peerSocket.onmessage = evt => {

  let newValue = evt.data.newValue;
  if (evt.data.key === Keys.COLOR && newValue) {
    let color = JSON.parse(newValue);

    config.color = color;

    ui.uiColor = color;

  } else if (evt.data.key === Keys.SESSION && newValue) {
      const newValueParsed = JSON.parse(newValue);
      let pomodoroDurationInMinutes = newValueParsed.values[0].value;
      
      config.pomodoroInMinutes = pomodoroDurationInMinutes;
      pomodoro.setSessionDuration(pomodoroDurationInMinutes);
      onPomodoroSettingsChange();
      
  } else if (evt.data.key === Keys.BREAK && newValue) {
    const newValueParsed = JSON.parse(newValue);
    let shortBreakDuration = newValueParsed.values[0].value;

    config.shortBreakInMinutes = shortBreakDuration;
    pomodoro.setShortBreakDuration(shortBreakDuration);
    onPomodoroSettingsChange();
    
  } else if (evt.data.key === Keys.BREAK_LONG && newValue) {
    const newValueParsed = JSON.parse(newValue);
    let longBreakDuration = newValueParsed.values[0].value;

    config.longBreakInMinutes = longBreakDuration;
    pomodoro.setLongBreakDuration(longBreakDuration);
    onPomodoroSettingsChange();
  }
};