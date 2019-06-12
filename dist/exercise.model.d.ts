import { Preset } from "./preset.model";
import { WorkoutSet } from "./workout-exercise.model";
export declare class Timings {
    holdDown: number;
    positives: number;
    hold: number;
    negatives: number;
    rest: number;
    duration: number;
}
export declare class Exercise {
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
    generalSetGoal: number;
    repRange: string;
    repRangeTimeline: string[];
    routineId: string;
    routineName: string;
    maxRepsSet: WorkoutSet;
    preset: Preset;
}
