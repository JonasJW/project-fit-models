import Progression from "./progression.model";
import { ExerciseStatusEntry } from "./index";
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
    name: string;
    tutorKey: string;
    isCircuit: boolean;
    isSupersetParent: boolean;
    isSupersetChild: boolean;
    routineId: string;
    routineName: string;
    progressions: Progression[];
    selectedProgression: number;
    statusEntry: ExerciseStatusEntry;
}
