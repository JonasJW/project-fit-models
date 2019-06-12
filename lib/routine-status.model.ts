import { WorkoutExercise } from "./workout-exercise.model";

export class RoutineStatus {

    id: string;
    routineId: string;
    exerciseStatuses: WorkoutExercise[];
    bestMaxReps: WorkoutExercise[];
    workoutHistory: string[];

    isFirst: boolean;

    constructor(routineId?: string) {
        if (routineId) {
            this.routineId = routineId;
            this.workoutHistory = [];
            this.exerciseStatuses = [];
            this.isFirst = true;
        }
    }

}