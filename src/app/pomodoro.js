import * as Keys from "../shared/keys";
import Timer from "./timer";

export default class Pomodoro {
  constructor(config, state, onTick, onTimerFinished) {
    this.pomodoroTimes = new Map();
    this.setSessionDuration(config.pomodoroInMinutes);
    this.setLongBreakDuration(config.longBreakInMinutes);
    this.setShortBreakDuration(config.shortBreakInMinutes);
    this.state = state;

    this.timer = new Timer(() => {
      this.state.setNextMode();
      onTimerFinished(state.getSessions());
    }, onTick);
  }

  start() {
    if (!this.timer.isRunning) {
      let time = this.getCurrentTime();
      this.timer.start(time);
      
    } else {
      this.timer.resume();
    }
  }

  pause() {
    this.timer.pause();
  }

  reset() {
    this.timer.stop();
    this.state.reset();  
  }

  skip() {
    this.timer.stop();
    this.state.setNextMode();
  }

  setSessionDuration(sessionInMinutes) {
    this.pomodoroTimes.set(Keys.SESSION, sessionInMinutes *60);
  }

  setShortBreakDuration(shortBreakInMinutes) {
    this.pomodoroTimes.set(Keys.BREAK, shortBreakInMinutes *60);
  }

  setLongBreakDuration(longBreakInMinutes) {
    this.pomodoroTimes.set(Keys.BREAK_LONG,  longBreakInMinutes*60);
  }
  
  getCurrentTime() {
    return this.pomodoroTimes.get(this.state.getCurrentMode());
  }

  get isRunning() {
    return this.timer.isRunning;
  }
}