export class RoutineStatus {
    constructor(routine) {
        this.workoutHistory = [];
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
