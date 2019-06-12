import { Exercise } from "./exercise.model";
import { RoutineExercise } from "./routine-exercise.model";
export declare class WorkoutExercise extends Exercise {
    sets: WorkoutSet[];
    currentSet: number;
    recentExercise: WorkoutExercise;
    constructor(routineExercise: RoutineExercise, setCount: number);
}
export declare class WorkoutSet {
    reps: number;
    weight: number;
    timestamp: number;
    isBilateral: boolean;
    isLeft: boolean;
    weightGoal: number;
    setGoal: number;
    constructor(isLeft?: boolean);
}
