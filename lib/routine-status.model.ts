import { WorkoutExercise } from "./workout-exercise.model";
import { ExerciseStatusEntry } from "./index";

export class RoutineStatus {

    id: string;
    routineId: string;
    exerciseStatuses: { [key: string]: ExerciseStatusEntry };
    bestMaxReps: WorkoutExercise[];
    workoutHistory: string[] = [];

    isFirst: boolean;

    constructor(routineId?: string) {
        if (routineId) {
            this.routineId = routineId;
            this.workoutHistory = [];
            this.exerciseStatuses = {};
            this.isFirst = true;
        }
    }

}