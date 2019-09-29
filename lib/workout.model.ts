import {WorkoutExercise, WorkoutSet } from "./workout-exercise.model";
import { Routine } from "./routine.model";
import { RoutineStatus } from "./routine-status.model";
import { RoutineExercise } from "./routine-exercise.model";


export class Workout {
    name: string;
    id: string;
    duration: string;
    difficulty: number;
    isCircuit: boolean;
    // isTest: boolean;
    circuitRounds: number;
    hasWarmup: boolean;
    routineId: string;
    routineName: string;
    programmId: string;
    programmName: string;

    finishedAt: number;
    startedAt: number;

    // entryKeys: string[];

    // Excluded from db:
    exercises: WorkoutExercise[];
    warumup: {
        name: string,
        resource: string,
        duration: number
    }[];
    currentExercise = 0;
    selectedExercise = 0;
    currentCircuitRound = 0;
    lastWorkout: Workout;
    // status: RoutineStatus;

    constructor(routine: Routine) {
        const now = new Date();
        const date = `${(now.getMonth() + 1) >= 10 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)}-${now.getDate() >= 10 ? now.getDate() : '0' + now.getDate()}-${now.getFullYear()}`
        this.name = routine.name + ' ' + date,
        this.routineName = routine.name;
        this.routineId = routine.id;
        this.programmId = routine.programmId;
        this.programmName = routine.programmName;
        this.startedAt = new Date().getTime();
        this.isCircuit = routine.isCircuit;
        this.circuitRounds = routine.circuitRounds;
        // this.status = status;
        this.exercises = [];
        if (routine.warmup != null && routine.warmup.length > 0) {
            this.warumup = routine.warmup;
            this.hasWarmup = true;
            this.selectedExercise = -1;
            this.currentExercise = -1;
        } else {
            this.hasWarmup = false;
        }

        // if (routine.maxRepTest && status && status.isFirst) {
        //     this.isTest = true;
        // } else {
        //     this.isTest = false;
        // }

        // if (this.isTest == true) {
        //     this.exercises = routine.exercises.map((routineExercise) => {
        //         const exercise = JSON.parse(JSON.stringify(routineExercise)) as WorkoutExercise;
        //         if (!exercise.progression) {
        //             exercise.progression = null; // ensures object has progression key, so select will have Defaul Prog as default
        //         }
        //         exercise.currentSet = 0;
        //         exercise.sets = [new WorkoutSet()];

        //         return exercise;
        //     })
        // } else {
            routine.exercises.forEach((routineExercise) => {
                const exercise = JSON.parse(JSON.stringify(routineExercise)) as WorkoutExercise;
                // if (!exercise.progression) {
                //     exercise.progression = null; // ensures object has progression key, so select will have Defaul Prog as default
                // }
                exercise.currentSet = 0;
                exercise.sets = [];
                for (let i = 0; i < (routine.isCircuit ? routine.circuitRounds : routineExercise.sets); i++) {
                    // if (!routineExercise.preset) { console.log('preset not found', routineExercise.presetKey) }
                    
                    if (routineExercise.progressions[routineExercise.selectedProgression] && routineExercise.progressions[routineExercise.selectedProgression].isBilateral == false) {
                        const _set = new WorkoutSet();
                        if (routineExercise.statusEntry != null && routineExercise.statusEntry.progressionEntries != null && routineExercise.progressions[routineExercise.selectedProgression] != null) {
                            _set.weight = routineExercise.statusEntry.progressionEntries[routineExercise.progressions[routineExercise.selectedProgression].id].sets[i].weight;
                        }
                        exercise.sets.push(new WorkoutSet());
                    } else {
                        // TODO: Apply statusEntry like above
                        exercise.sets.push(new WorkoutSet(true));
                        exercise.sets.push(new WorkoutSet(false));
                    }
                }
                this.exercises.push(exercise);
            })
        // }

        // this.updateRoutineWithRoutineStatus(status)
    }

    // updateRoutineWithRoutineStatus(status: RoutineStatus) {
    //     if (!status || !status.bestMaxReps) {
    //         return;
    //     }

    //     for (let i = 0; i < this.exercises.length; i++) {
    //         if (status.bestMaxReps.length > 1) {   // If there is a bestMaxRep entry for exercise
    //             if (this.exercises[i].presetKey === status.bestMaxReps[i].presetKey) { // verify its the same preset (Prob unnessecary) 
    //                 this.exercises[i].progression = status.bestMaxReps[i].progression;
    //                 this.exercises[i].isWeighted = status.bestMaxReps[i].isWeighted;
    //                 this.exercises[i].sets.forEach((set) => {
    //                     set.weight = status.bestMaxReps[i].sets[0].weight;
    //                 });
    //                 this.exercises[i].maxRepsSet = status.bestMaxReps[i].sets[0];
    //             }
    //         }
    //     }
    // }

}