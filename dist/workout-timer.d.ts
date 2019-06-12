export default class WorkoutTimer {
    timeRemaining: number;
    tickIntervallMillis: number;
    isPaused: boolean;
    startedForMillis: number;
    percentage: number;
    interval: any;
    constructor();
    setTimer(seconds: number): void;
    startTimer(onFinished: Function, onTick: Function): void;
    startStopwatch(onTick: any, startAt?: any): void;
    skipTo10(): void;
    pauseInterval(): void;
    cancelTimer(): void;
}
