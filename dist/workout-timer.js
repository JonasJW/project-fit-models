export default class WorkoutTimer {
    constructor() {
        this.timeRemaining = 0;
        this.tickIntervallMillis = 100;
        this.isPaused = true;
    }
    setTimer(seconds) {
        this.timeRemaining = seconds * 1000;
        this.startedForMillis = seconds * 1000;
        this.percentage = 1;
    }
    startTimer(onFinished, onTick) {
        this.isPaused = false;
        this.interval = setInterval(() => {
            this.timeRemaining -= this.tickIntervallMillis;
            this.percentage = (this.timeRemaining / this.startedForMillis);
            if (this.timeRemaining <= 0) {
                clearInterval(this.interval);
                if (onFinished)
                    onFinished();
            }
            else {
                if (this.timeRemaining % 1000 === 0) {
                    if (onTick)
                        onTick(this.timeRemaining);
                }
            }
        }, this.tickIntervallMillis);
    }
    startStopwatch(onTick, startAt) {
        console.log('startAt', startAt);
        this.percentage = 0;
        if (startAt >= 0) {
            this.timeRemaining = startAt * 1000;
        }
        else {
            this.timeRemaining = 0;
        }
        this.interval = setInterval(() => {
            this.timeRemaining += 1000;
            if (onTick)
                onTick(this.timeRemaining);
        }, 1000);
    }
    skipTo10() {
        this.timeRemaining = 10000;
        this.percentage = (this.timeRemaining / this.startedForMillis);
    }
    pauseInterval() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.isPaused = true;
    }
    cancelTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.timeRemaining = null;
        }
    }
}
