import { RoutineExercise } from './routine-exercise.model';
export declare class Routine {
    id: string;
    name: string;
    thumbnailUrl: string;
    thumbnailSmUrl: string;
    description: string;
    duration: string;
    difficulty: number;
    isCircuit: boolean;
    circuitRounds: number;
    maxRepTest: boolean;
    programmName: string;
    programmId: string;
    exercises: RoutineExercise[];
    constructor();
}
