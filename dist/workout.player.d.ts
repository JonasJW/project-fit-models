import WorkoutTimer from "./workout-timer";
import { WorkoutExercise } from "./workout-exercise.model";
import { Workout } from "./workout.model";
export declare enum ExerciseState {
    REST = "Rest",
    HOLDDOWN = "Hold Down",
    POSITIVE = "Positive",
    HOLD = "Hold",
    NEGATIVE = "Negative",
    GETREADY = "Get Ready",
    CUIRCUIT = "Cuircuit",
    STATIC = "Static"
}
export default class WorkoutPlayer {
    private workout;
    private settings?;
    timer: WorkoutTimer;
    getReadySeconds: number;
    isStarted: boolean;
    isPlaying: boolean;
    hasEnded: boolean;
    currentRepCount: number;
    getReadyTimeLieftNeeded: boolean;
    countedLoud: boolean;
    useTTS: boolean;
    exerciseState: ExerciseState;
    constructor(workout: Workout, settings?: any);
    playPause(): void;
    stopSet(): void;
    startGetReady(): void;
    startPause(): void;
    nextSet(): void;
    nextExercise(): void;
    previousSet(): void;
    previousExercise(): void;
    updateReps(): void;
    startHold(): any;
    startNegative(): any;
    startHoldDown(): any;
    startPositive(): any;
    startSet(): void;
    startStatic(): void;
    startCircuitExercise(): void;
    nextSuperset(): void;
    setReps(reps: number): void;
    secondsToMinutesAndSeconds(seconds: number): string;
    playTickSound(): void;
    playRestSounds(timeLeft: number): void;
    cancel(): void;
    speak(message: string): void;
    currentExercise(): WorkoutExercise;
    countRep(): boolean;
    stopAfterRepGoal(): boolean;
    readonly hasPrevExercise: boolean;
    readonly hasPrevSet: boolean;
    readonly hasNextExercise: boolean;
    readonly hasNextSet: boolean;
}
