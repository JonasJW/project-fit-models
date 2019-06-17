import { WorkoutSet } from "./workout-exercise.model";
export class Workout {
    constructor(routine, status) {
        this.currentExercise = 0;
        this.selectedExercise = 0;
        this.currentCircuitRound = 0;
        const now = new Date();
        const date = `${now.getMonth() >= 10 ? now.getMonth() : '0' + now.getMonth()}-${now.getDate() >= 10 ? now.getDate() : '0' + now.getDate()}-${now.getFullYear()}`;
        this.name = routine.name + ' ' + date,
            this.routineName = routine.name;
        this.routineId = routine.id;
        this.startedAt = new Date().getTime();
        this.isCircuit = routine.isCircuit;
        this.circuitRounds = routine.circuitRounds;
        this.status = status;
        this.exercises = [];
        if (this.isTest == true) {
            this.exercises = routine.exercises.map((routineExercise) => {
                const exercise = JSON.parse(JSON.stringify(routineExercise));
                if (!exercise.progression) {
                    exercise.progression = null; // ensures object has progression key, so select will have Defaul Prog as default
                }
                exercise.currentSet = 0;
                exercise.sets = [new WorkoutSet()];
                return exercise;
            });
        }
        else {
            routine.exercises.forEach((routineExercise) => {
                const exercise = JSON.parse(JSON.stringify(routineExercise));
                if (!exercise.progression) {
                    exercise.progression = null; // ensures object has progression key, so select will have Defaul Prog as default
                }
                exercise.currentSet = 0;
                exercise.sets = [];
                for (let i = 0; i < (routine.isCircuit ? routine.circuitRounds : routineExercise.sets); i++) {
                    if (!routineExercise.preset.isBilateral) {
                        exercise.sets.push(new WorkoutSet());
                    }
                    else {
                        exercise.sets.push(new WorkoutSet(true));
                        exercise.sets.push(new WorkoutSet(false));
                    }
                }
                this.exercises.push(exercise);
            });
        }
        if (routine.maxRepTest && status && status.isFirst) {
            this.isTest = true;
        }
        else {
            this.isTest = false;
        }
        this.updateRoutineWithRoutineStatus(status);
    }
    updateRoutineWithRoutineStatus(status) {
        if (!status || !status.bestMaxReps) {
            return;
        }
        for (let i = 0; i < this.exercises.length; i++) {
            if (status.bestMaxReps.length > 1) { // If there is a bestMaxRep entry for exercise
                if (this.exercises[i].presetKey === status.bestMaxReps[i].presetKey) { // verify its the same preset (Prob unnessecary) 
                    this.exercises[i].progression = status.bestMaxReps[i].progression;
                    this.exercises[i].isWeighted = status.bestMaxReps[i].isWeighted;
                    this.exercises[i].sets.forEach((set) => {
                        set.weight = status.bestMaxReps[i].sets[0].weight;
                    });
                    this.exercises[i].maxRepsSet = status.bestMaxReps[i].sets[0];
                }
            }
        }
    }
}
