import { WorkoutExercise } from "./workout-exercise.model";
export declare class RoutineStatus {
    id: string;
    routineId: string;
    exerciseStatuses: WorkoutExercise[];
    bestMaxReps: WorkoutExercise[];
    workoutHistory: string[];
    isFirst: boolean;
    constructor(routineId?: string);
}
