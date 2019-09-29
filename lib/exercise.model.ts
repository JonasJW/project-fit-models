import { Preset } from "./preset.model";
import { WorkoutSet } from "./workout-exercise.model";
import Progression from "./progression.model";
import { ExerciseStatusEntry } from "./index";

export class Timings {
    holdDown: number;
    positives: number;
    hold: number;
    negatives: number;
    rest: number;
    duration: number;
}

export class Exercise {

    id: string;
    name: string;
    tutorKey: string;
    isCircuit: boolean;
    isSupersetParent: boolean;
    isSupersetChild: boolean;
    routineId: string;
    routineName: string;
    progressions: Progression[];
    selectedProgression: number;

    //exclude
    statusEntry: ExerciseStatusEntry;

    //Depricated
    // presetKey: string;
    // progression: string;
    // previewUrl: string;
    // timings: Timings;
    // isWeighted: boolean;
    // intensitiy: number;
    // generalSetGoal: number; // ?
    // repRange: string;
    // repRangeTimeline: string[]
    // progressionsResources: {};
    // // exclude
    // maxRepsSet: WorkoutSet;
    // preset: Preset;
}