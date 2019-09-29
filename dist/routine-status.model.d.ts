import { WorkoutExercise } from "./workout-exercise.model";
import { ExerciseStatusEntry, Routine } from "./index";
export declare class RoutineStatus {
    id: string;
    routineId: string;
    routineName: string;
    programmId: string;
    programmName: string;
    exerciseStatuses: {
        [key: string]: ExerciseStatusEntry;
    };
    bestMaxReps: WorkoutExercise[];
    workoutHistory: string[];
    isFirst: boolean;
    constructor(routine?: Routine);
}
