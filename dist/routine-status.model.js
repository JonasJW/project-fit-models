export class RoutineStatus {
    constructor(routineId) {
        if (routineId) {
            this.routineId = routineId;
            this.workoutHistory = [];
            this.exerciseStatuses = [];
            this.isFirst = true;
        }
    }
}
