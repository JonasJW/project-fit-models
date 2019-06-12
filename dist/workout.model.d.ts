import { WorkoutExercise } from "./workout-exercise.model";
import { Routine } from "./routine.model";
import { RoutineStatus } from "./routine-status.model";
export declare class Workout {
    name: string;
    id: string;
    isCircuit: boolean;
    isTest: boolean;
    circuitRounds: number;
    routineId: string;
    routineName: string;
    finishedAt: number;
    startedAt: number;
    entryKeys: string[];
    exercises: WorkoutExercise[];
    currentExercise: number;
    selectedExercise: number;
    currentCircuitRound: any;
    lastWorkout: Workout;
    status: RoutineStatus;
    constructor(routine: Routine, status: RoutineStatus);
    updateRoutineWithRoutineStatus(status: RoutineStatus): void;
}
