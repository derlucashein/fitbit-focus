import * as Keys from "../shared/keys";

export default class State {
  
  constructor(currentMode, sessions, onSessionsChanged, onModeChanged) {
    this.onModeChanged = onModeChanged;
    this.onSessionsChanged = onSessionsChanged;
    this.currentMode = currentMode;
    this.sessions = sessions;
  }
  
  reset() {
    this.currentMode = Keys.SESSION;
    this.onModeChanged(this.currentMode);
    this.sessions = 0;
    this.onSessionsChanged(this.sessions);
  }
  
  setNextMode() {
  
    if (this.sessions !== 0 && (this.sessions+1)%4 === 0 && this.currentMode === Keys.SESSION) {
      this.currentMode = Keys.BREAK_LONG;
      this.sessions++;
      this.onSessionsChanged(this.sessions);
      this.onModeChanged(this.currentMode);
      return;
    }

    if (this.currentMode === Keys.SESSION) {
      this.currentMode = Keys.BREAK;
      this.sessions++;
      this.onSessionsChanged(this.sessions);
    } else if (this.currentMode === Keys.BREAK) {
      this.currentMode = Keys.SESSION;
    } else if (this.currentMode === Keys.BREAK_LONG) {
      this.currentMode = Keys.SESSION;
    }
    
    this.onModeChanged(this.currentMode);
  }
  
  getCurrentMode() {
    return this.currentMode;
  }
  
  getSessions() {
    return this.sessions;
  }
}