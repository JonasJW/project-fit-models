import { WorkoutExercise } from "./workout-exercise.model";
import { ExerciseStatusEntry } from "./index";
export declare class RoutineStatus {
    id: string;
    routineId: string;
    exerciseStatuses: {
        [key: string]: ExerciseStatusEntry;
    };
    bestMaxReps: WorkoutExercise[];
    workoutHistory: string[];
    isFirst: boolean;
    constructor(routineId?: string);
}
