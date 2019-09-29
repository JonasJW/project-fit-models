import { Exercise } from "./exercise.model";
export class WorkoutExercise extends Exercise {
    // recentExercise: WorkoutExercise;
    constructor(routineExercise, setCount) {
        super();
        // exclude
        this.currentSet = 0;
        // this.presetKey = routineExercise.presetKey;
    }
}
export class WorkoutSet {
    constructor(isLeft) {
        this.reps = null;
        this.weight = null;
        if (isLeft != null) {
            this.isBilateral = true;
            this.isLeft = isLeft;
        }
        else {
            this.isBilateral = false;
        }
    }
}
