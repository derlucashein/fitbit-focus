import document from "document";
import Utils from "./utils";
import * as Keys from "../shared/keys";
export default class UI {

    _startButton;
    _pauseButton;
    _skipButton;
    _resetButton;

    _timerView;
    _sessionsView;
    _iconBreak;

    _uiColor;

    _onStart;
    _onPause;
    _onSkip;
    _onReset;

    constructor(uiColor) {

        this._startButton = document.getElementById("buttonStart");
        this._pauseButton = document.getElementById("buttonPause");
        this._skipButton = document.getElementById("buttonSkip");
        this._resetButton = document.getElementById("buttonReset");

        this._timerView = document.getElementById("timer");
        this._sessionsView = document.getElementById("sessions");
        this._iconBreak = document.getElementById("iconBreak");
        this._uiColor = uiColor;

        this._setUiListener();

        this._updateColorOnButtons();
    } 

    toggleStartPauseButtons(shouldStartButtonBeVisible) {
        if (shouldStartButtonBeVisible) {
            this._startButton.style.display = "inline";
            this._pauseButton.style.display = "none";
        } else {
            this._startButton.style.display = "none";
            this._pauseButton.style.display = "inline";
        }
      }
      
    toggleResetSkipButtons(shouldResetbuttonBeVisible) {
        if (shouldResetbuttonBeVisible) {
            this._resetButton.style.display = "inline";
            this._skipButton.style.display = "none";
        } else {
            this._resetButton.style.display = "none";
            this._skipButton.style.display = "inline";
        }
    }

    toggleIconBreak(mode) {
        if (mode === Keys.SESSION) {
            this._iconBreak.style.display = "none";
          } else {
            this._iconBreak.style.display = "inline";
        }
    }

    updateTimerView(timeInSeconds) {
        let timeString = Utils.secondsToMMSS(timeInSeconds);
        this._timerView.text = timeString;
    }

    updateSessionsView(sessions) {
        this._sessionsView.text = sessions;
    }

    set uiColor(uiColor) {
        this._uiColor = uiColor;

        this._updateColorOnButtons();
    }

    set onStart(onStart) {
        this._onStart = onStart;
    }

    set onPause(onPause) {
        this._onPause = onPause;
    }

    set onSkip(onSkip) {
        this._onSkip = onSkip;
    }

    set onReset(onReset) {
        this._onReset = onReset;
    }

    get startButton() {
        return this._startButton;
    }

    get pauseButton() {
        return this._pauseButton;
    }

    get skipButton() {
        return this._skipButton;
    }

    get resetButton() {
        return this._resetButton;
    }

    _updateColorOnButtons() {
        this._startButton.style.fill = this._uiColor;
        this._pauseButton.style.fill = this._uiColor;
    }

    _setUiListener() {
        this._startButton.onactivate = (e) => this._onStartButtonClick();

        this._pauseButton.onactivate = (e) => this._onPauseButtonClick();

        this._skipButton.onactivate = (e) => this._onSkipButtonClick();

        this._resetButton.onactivate = (e) => this._onResetButtonClick();
    }

    _onStartButtonClick() {
        if (this._onStart !== undefined) {

            this.toggleStartPauseButtons(false);
            this.toggleResetSkipButtons(false);

            this._onStart();
        }
    }

    _onPauseButtonClick() {
        if (this._onPause !== undefined) {
            this.toggleStartPauseButtons(true);
            this.toggleResetSkipButtons(true);

            this._onPause();
        }
    }

    _onSkipButtonClick() {
        if (this._onSkip !== undefined) {
            this.toggleResetSkipButtons(true);

            this._onSkip();
        }
    }

    _onResetButtonClick() {
        if (this._onReset !== undefined) {
            this._onReset();
        }
    }

}