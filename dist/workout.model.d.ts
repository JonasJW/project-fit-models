import { WorkoutExercise } from "./workout-exercise.model";
import { Routine } from "./routine.model";
export declare class Workout {
    name: string;
    id: string;
    duration: string;
    difficulty: number;
    isCircuit: boolean;
    circuitRounds: number;
    hasWarmup: boolean;
    routineId: string;
    routineName: string;
    programmId: string;
    programmName: string;
    finishedAt: number;
    startedAt: number;
    exercises: WorkoutExercise[];
    warumup: {
        name: string;
        resource: string;
        duration: number;
    }[];
    currentExercise: number;
    selectedExercise: number;
    currentCircuitRound: number;
    lastWorkout: Workout;
    constructor(routine: Routine);
}
