import { Preset } from "./preset.model";
import { WorkoutSet } from "./workout-exercise.model";

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
    presetKey: string;
    progression: string;
    tutorKey: string;
    previewUrl: string;
    timings: Timings;
    isWeighted: boolean;
    isCircuit: boolean;

    isSupersetParent: boolean;
    isSupersetChild: boolean;

    intensitiy: number;
    generalSetGoal: number; // ?
    repRange: string;
    repRangeTimeline: string[]
    
    routineId: string;
    routineName: string;

    progressionsResources: {};
    
    
    // exclude
    maxRepsSet: WorkoutSet;
    preset: Preset;
}