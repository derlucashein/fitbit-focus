export default class Utils {
    static secondsToMMSS(timeInSeconds) {
        let date = new Date(null);
        date.setSeconds(timeInSeconds);
    
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
    
        let minutesString ="";
        let secondsString ="";
    
        if (minutes < 10) {
          minutesString = "0"+minutes;
        } else {
          minutesString = minutes;
        }
    
        if (seconds < 10) {
          secondsString = "0"+seconds;
        } else {
          secondsString = seconds;
        }
        return minutesString +':'+ secondsString;
      }
}