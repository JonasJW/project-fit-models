export class RoutineStatus {
    constructor(routineId) {
        this.workoutHistory = [];
        if (routineId) {
            this.routineId = routineId;
            this.workoutHistory = [];
            this.exerciseStatuses = {};
            this.isFirst = true;
        }
    }
}
