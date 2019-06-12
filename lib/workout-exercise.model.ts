import { Exercise } from "./exercise.model";
import { RoutineExercise } from "./routine-exercise.model";

export class WorkoutExercise extends Exercise {
    sets: WorkoutSet[];

    // exclude
    currentSet = 0;
    recentExercise: WorkoutExercise;

    constructor(routineExercise: RoutineExercise, setCount: number) {
        super();
        this.presetKey = routineExercise.presetKey;
    }
}

export class WorkoutSet {
    reps: number;
    weight: number;
    timestamp: number;
    isBilateral: boolean;
    isLeft: boolean;

    weightGoal: number;
    setGoal: number;

    constructor(isLeft?: boolean) {
        this.reps = null;
        this.weight = null;
        if (isLeft != null) {
            this.isBilateral = true;
            this.isLeft = isLeft;
        } else {
            this.isBilateral = false;
        }
    }
}