export default class Timer {
  
  constructor(onFinished, onTick) {
    this.onFinished = onFinished;
    this.onTick = onTick;
    this.isRunning = false;
    this.time = 0;
    this.interval = null;
  }
  
  start(time) {
  
    if (!this.isTimerRunning) {
      
      this.time = time;
      this.isRunning = true;
      
      this.interval = setInterval(() => {
        
        
        this.onTick(this.time);
        
        this.time--;

        if (this.time < 0) {
          this.stop();
          this.isRunning = false;
          this.onFinished();
          
        }
      }, 1000);
    }
  }
  
  pause() {
    if (this.isRunning && this.interval != null) {
      clearInterval(this.interval);
    }
  }
  
  resume() {
    this.start(this.time);
  }
  
  stop() {
    if (this.isRunning && this.interval != null) {
      clearInterval(this.interval);
      this.isRunning = false;
    }
  }
  
  isRunning() {
    return this.isRunning;
  }
}