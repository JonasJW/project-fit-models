import { WorkoutExercise } from "./workout-exercise.model";
import { Routine } from "./routine.model";
import { RoutineStatus } from "./routine-status.model";
export declare class Workout {
    name: string;
    id: string;
    duration: string;
    difficulty: number;
    isCircuit: boolean;
    isTest: boolean;
    circuitRounds: number;
    hasWarmup: boolean;
    routineId: string;
    routineName: string;
    programmId: string;
    programmName: string;
    finishedAt: number;
    startedAt: number;
    entryKeys: string[];
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
    status: RoutineStatus;
    constructor(routine: Routine, status: RoutineStatus);
    updateRoutineWithRoutineStatus(status: RoutineStatus): void;
}
