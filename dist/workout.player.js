import WorkoutTimer from "./workout-timer";
export var ExerciseState;
(function (ExerciseState) {
    ExerciseState["REST"] = "Rest";
    ExerciseState["HOLDDOWN"] = "Hold Down";
    ExerciseState["POSITIVE"] = "Positive";
    ExerciseState["HOLD"] = "Hold";
    ExerciseState["NEGATIVE"] = "Negative";
    ExerciseState["GETREADY"] = "Get Ready";
    ExerciseState["CUIRCUIT"] = "Cuircuit";
    ExerciseState["STATIC"] = "Static";
})(ExerciseState || (ExerciseState = {}));
export default class WorkoutPlayer {
    constructor(workout, settings) {
        this.workout = workout;
        this.settings = settings;
        this.getReadySeconds = 10;
        this.isStarted = false;
        this.isPlaying = false;
        this.hasEnded = false;
        this.getReadyTimeLieftNeeded = true;
        this.countedLoud = false;
        this.useTTS = true;
        this.timer = new WorkoutTimer();
        this.startGetReady();
    }
    playPause() {
        if (!this.isStarted) {
            this.isStarted = true;
            this.isPlaying = true;
            this.timer.startTimer((() => {
                this.startSet();
            }), this.playRestSounds.bind(this));
        }
        else {
            if (this.isPlaying) {
                this.isPlaying = false;
                this.timer.pauseInterval();
            }
            else {
                this.isPlaying = true;
                if (this.exerciseState !== ExerciseState.STATIC) {
                    this.timer.startTimer(() => {
                        switch (this.exerciseState) {
                            case ExerciseState.HOLDDOWN:
                                this.startPositive();
                                return;
                            case ExerciseState.NEGATIVE:
                                this.startHoldDown();
                                return;
                            case ExerciseState.HOLD:
                                this.startNegative();
                                return;
                            case ExerciseState.POSITIVE:
                                this.startHold();
                                return;
                            case ExerciseState.GETREADY:
                                this.startSet();
                                return;
                            case ExerciseState.CUIRCUIT:
                                this.startPause(); //TODO: ! REALLY ??
                                return;
                        }
                    }, this.playRestSounds.bind(this));
                }
                else {
                    if (this.exerciseState == ExerciseState.STATIC) {
                        this.timer.startStopwatch((millis) => {
                            this.currentRepCount = Math.floor(millis / 1000);
                            console.log(this.currentRepCount);
                        }, this.currentRepCount);
                    }
                }
            }
        }
    }
    stopSet() {
        if (this.exerciseState == ExerciseState.REST) {
            return;
        }
        this.updateReps();
        this.timer.cancelTimer();
        if (this.currentExercise().isSupersetChild || this.currentExercise().isSupersetParent) {
            this.nextSuperset();
        }
        else {
            this.startPause();
        }
    }
    startGetReady() {
        console.log('Start Get Ready');
        this.timer.setTimer(this.getReadySeconds);
        this.exerciseState = ExerciseState.GETREADY;
        if (this.getReadyTimeLieftNeeded) {
            this.speak(this.getReadySeconds.toString() + '!');
        }
        // TODO:
        // if (this.currentExercise().sets[this.currentExercise().currentSet].setGoal != null) {
        //     this.speak('Next Goal is ' + this.currentExercise().sets[this.currentExercise().currentSet].setGoal.toString())
        // }
        if (this.isPlaying) {
            this.timer.startTimer((() => {
                this.startSet();
            }), this.playRestSounds.bind(this));
        }
    }
    startPause() {
        this.exerciseState = ExerciseState.REST;
        let rest = 0;
        if (!this.currentExercise().preset.isBilateral) {
            if (this.currentExercise().timings.rest) {
                rest = this.currentExercise().timings.rest;
            }
        }
        else {
            if (this.currentExercise().sets[this.currentExercise().currentSet].isLeft) {
                rest = 0;
            }
            else {
                if (this.currentExercise().timings.rest != null) {
                    rest = this.currentExercise().timings.rest;
                }
            }
        }
        this.timer.setTimer(rest);
        if (this.isPlaying) {
            if (this.useTTS) {
                if (rest == 0) {
                    this.getReadyTimeLieftNeeded = false;
                }
                else {
                    this.getReadyTimeLieftNeeded = true;
                }
                this.speak('Rest ' + this.secondsToMinutesAndSeconds(rest + this.getReadySeconds));
                if (this.currentExercise().currentSet == this.currentExercise().sets.length - 1) {
                    const nextExercise = this.workout.exercises[this.workout.currentExercise + 1];
                    let nextExerciseAnnounce = 'Next Exercise: ' + nextExercise.preset.name + '!';
                    if (nextExercise.progression != null) {
                        nextExerciseAnnounce += nextExercise.progression + '!';
                    }
                    if (nextExercise.isWeighted) {
                        nextExerciseAnnounce += 'Weighted';
                    }
                    this.speak(nextExerciseAnnounce);
                }
            }
            else {
            }
            this.timer.startTimer(() => {
                this.nextSet();
            }, this.playRestSounds.bind(this));
        }
        console.log('start Pause');
    }
    nextSet() {
        this.timer.cancelTimer();
        this.updateReps();
        if (this.exerciseState == ExerciseState.REST) {
            if (this.workout.isCircuit) {
                if (this.workout.currentExercise < this.workout.exercises.length - 1) {
                    this.currentExercise().currentSet++;
                    this.nextExercise();
                }
                else {
                    this.currentExercise().currentSet++;
                    this.workout.currentExercise = 0;
                    this.startGetReady();
                }
            }
            else {
                if (this.currentExercise().currentSet < this.currentExercise().sets.length - 1) {
                    this.currentExercise().currentSet++;
                    this.startGetReady();
                }
                else if (this.currentExercise().currentSet == this.currentExercise().sets.length - 1) {
                    this.nextExercise();
                }
            }
        }
        else {
            this.startPause();
        }
    }
    nextExercise() {
        this.timer.cancelTimer();
        this.updateReps();
        if (this.workout.currentExercise < this.workout.exercises.length - 1) {
            this.workout.currentExercise++;
            this.workout.selectedExercise = this.workout.currentExercise;
            this.startGetReady();
        }
        else {
            this.isPlaying = false;
            this.hasEnded = true;
        }
    }
    previousSet() {
        this.timer.cancelTimer();
        this.updateReps();
        if (this.exerciseState == ExerciseState.REST) {
            this.startGetReady();
        }
        else {
            if (this.currentExercise().currentSet > 0) {
                this.currentExercise().currentSet--;
                this.startPause();
            }
            else {
                if (this.hasPrevExercise) {
                    this.previousExercise();
                }
                else {
                    this.startGetReady();
                }
            }
        }
        this.hasEnded = false;
    }
    previousExercise() {
        this.timer.cancelTimer();
        this.updateReps();
        if (this.workout.currentExercise > 0) {
            this.workout.currentExercise--;
            this.workout.selectedExercise = this.workout.currentExercise;
            this.startGetReady();
        }
        this.hasEnded = false;
    }
    updateReps() {
        if (this.currentExercise().preset.isDynamic) {
            this.setReps(this.currentRepCount);
        }
        else {
            if (this.timer.timeRemaining != null) {
                this.setReps(Math.floor(this.timer.timeRemaining / 1000));
            }
        }
    }
    startHold() {
        if (this.currentExercise().timings.hold == null || this.currentExercise().timings.hold === 0) {
            this.startNegative();
            return;
        }
        this.timer.setTimer(this.currentExercise().timings.hold);
        this.exerciseState = ExerciseState.HOLD;
        this.playTickSound();
        if (this.stopAfterRepGoal()) {
            return;
        }
        if (this.isPlaying) {
            this.timer.startTimer(() => {
                this.startNegative();
            }, this.playTickSound);
        }
    }
    startNegative() {
        this.timer.setTimer(this.currentExercise().timings.negatives);
        this.exerciseState = ExerciseState.NEGATIVE;
        this.playTickSound();
        if (this.isPlaying) {
            this.timer.startTimer(() => {
                if (!this.currentExercise().preset.isPush) {
                    const countedLoud = this.countRep();
                    if (this.settings.countOutLoud) {
                        this.countedLoud = countedLoud;
                        this.speak(this.currentRepCount.toString());
                    }
                }
                this.startHoldDown();
            }, this.playRestSounds.bind(this));
        }
    }
    startHoldDown() {
        if (this.currentExercise().timings.holdDown == null || this.currentExercise().timings.holdDown === 0) {
            this.startPositive();
            return;
        }
        this.timer.setTimer(this.currentExercise().timings.holdDown);
        this.exerciseState = ExerciseState.HOLDDOWN;
        this.playTickSound();
        if (this.stopAfterRepGoal()) {
            return;
        }
        if (this.isPlaying) {
            this.timer.startTimer(() => {
                this.startPositive();
            }, this.playTickSound);
        }
    }
    startPositive() {
        this.timer.setTimer(this.currentExercise().timings.positives);
        this.exerciseState = ExerciseState.POSITIVE;
        this.playTickSound();
        if (this.isPlaying) {
            this.timer.startTimer(() => {
                if (this.currentExercise().preset.isPush) {
                    const countedLoud = this.countRep();
                    if (this.settings.countOutLoud) {
                        this.countedLoud = countedLoud;
                        this.speak(this.currentRepCount.toString());
                    }
                }
                this.startHold();
            }, this.playRestSounds.bind(this));
        }
    }
    startSet() {
        this.currentRepCount = 0;
        if (!this.currentExercise().isCircuit) {
            if (this.currentExercise().preset.isDynamic) {
                if (this.currentExercise().preset.isPush) {
                    this.startHold();
                }
                else {
                    this.startHoldDown();
                }
            }
            else {
                this.startStatic();
            }
        }
        else {
            this.startCircuitExercise();
        }
    }
    startStatic() {
        this.exerciseState = ExerciseState.STATIC;
        this.timer.startStopwatch((millis) => {
            this.currentRepCount = Math.floor(millis / 1000);
            console.log(this.currentRepCount);
        });
    }
    startCircuitExercise() {
        this.timer.setTimer(this.currentExercise().timings.duration);
        this.speak('Go! ' + this.secondsToMinutesAndSeconds(this.currentExercise().timings.duration));
        this.exerciseState = ExerciseState.CUIRCUIT;
        if (this.isPlaying) {
            this.timer.startTimer(() => {
                this.stopSet();
            }, this.playRestSounds.bind(this));
        }
    }
    nextSuperset() {
        if (this.currentExercise().isSupersetParent) {
            const startedAtSet = this.currentExercise().currentSet;
            this.workout.currentExercise++;
            this.currentExercise().currentSet = startedAtSet;
            this.startGetReady();
        }
        else if (this.currentExercise().isSupersetChild) {
            this.currentExercise().currentSet++;
            this.workout.currentExercise--;
            this.startPause();
        }
    }
    setReps(reps) {
        if (reps != null && (this.currentExercise().sets[this.currentExercise().currentSet].reps == null || this.currentExercise().sets[this.currentExercise().currentSet].reps <= reps)) {
            this.currentExercise().sets[this.currentExercise().currentSet].reps = reps;
            this.currentExercise().sets[this.currentExercise().currentSet].timestamp = new Date().getTime();
        }
    }
    secondsToMinutesAndSeconds(seconds) {
        return `${(Math.round(seconds / 60) != 0 ? Math.round(seconds / 60).toString() + 'Minutes and ' : '')} ${seconds % 60} Seconds`;
        // return seconds.toString() + ' Seconds';
    }
    playTickSound() {
        // TODO:
        if (this.countedLoud) {
            this.countedLoud = false;
            return;
        }
        // window.speechSynthesis.cancel();
        switch (this.exerciseState) {
            case ExerciseState.HOLD:
                this.speak('Hold!');
                return;
            case ExerciseState.HOLDDOWN:
                this.speak('Hold!');
                return;
            case ExerciseState.NEGATIVE:
                this.speak('Down!');
                return;
            case ExerciseState.POSITIVE:
                this.speak('Up!');
                return;
        }
    }
    playRestSounds(timeLeft) {
        if (this.exerciseState == ExerciseState.REST) {
            if (timeLeft === 20000) {
                this.speak("30!");
            }
        }
        if (this.exerciseState == ExerciseState.GETREADY || this.exerciseState == ExerciseState.CUIRCUIT) {
            switch (timeLeft) {
                case 10000:
                    this.speak("10!");
                    return;
                case 3000:
                    var audio = new Audio('/sounds/last_tick.wav');
                    audio.volume = this.settings.instructionVolume;
                    audio.play();
                    return;
                case 2000:
                    var audio = new Audio('/sounds/last_tick.wav');
                    audio.volume = this.settings.instructionVolume;
                    audio.play();
                    return;
                case 1000:
                    var audio = new Audio('/sounds/last_tick.wav');
                    audio.volume = this.settings.instructionVolume;
                    audio.play();
                    return;
            }
        }
        if (this.exerciseState == ExerciseState.HOLD || this.exerciseState == ExerciseState.HOLDDOWN || this.exerciseState == ExerciseState.NEGATIVE || this.exerciseState == ExerciseState.POSITIVE) {
            if (this.settings.playTick) {
                if (!this.currentExercise().isCircuit && this.currentExercise().preset.isDynamic) {
                    var audio = new Audio('/sounds/tick.wav');
                    audio.volume = this.settings.instructionVolume;
                    audio.play();
                }
            }
        }
    }
    cancel() {
        window.speechSynthesis.cancel();
    }
    speak(message) {
        if (this.isPlaying) {
            if ('speechSynthesis' in window) {
                var msg = new SpeechSynthesisUtterance(message);
                msg.volume = this.settings.instructionVolume;
                msg.lang = 'en-US';
                window.speechSynthesis.speak(msg);
            }
            else {
                // TODO: show error
                console.log('Text to Speach not supported on this browser!');
            }
        }
    }
    currentExercise() {
        return this.workout.exercises[this.workout.currentExercise];
    }
    countRep() {
        if (this.currentRepCount != null) {
            this.currentRepCount++;
            return true;
        }
        else {
            this.currentRepCount = 0;
            return false;
        }
    }
    stopAfterRepGoal() {
        // TODO: 
        return false;
    }
    get hasPrevExercise() {
        return this.workout.currentExercise > 0;
    }
    get hasPrevSet() {
        return this.hasPrevExercise || this.currentExercise().currentSet > 0;
    }
    get hasNextExercise() {
        return this.workout.currentExercise < this.workout.exercises.length - 1;
    }
    get hasNextSet() {
        return (this.currentExercise().currentSet <= this.currentExercise().sets.length - 1 || this.hasNextExercise);
    }
}
