import { WorkoutExercise } from "./workout-exercise.model";
import { ExerciseStatusEntry, Routine } from "./index";

export class RoutineStatus {

    id: string;
    routineId: string;
    routineName: string;
    programmId: string;
    programmName: string;
    exerciseStatuses: { [key: string]: ExerciseStatusEntry };
    bestMaxReps: WorkoutExercise[];
    workoutHistory: string[] = [];

    isFirst: boolean;

    constructor(routine?: Routine) {
        if (routine) {
            this.routineId = routine.id;
            this.routineName = routine.name;
            this.programmId = routine.programmId;
            this.programmName = routine.programmName;
            this.workoutHistory = [];
            this.exerciseStatuses = {};
            this.isFirst = true;
        }
    }

}