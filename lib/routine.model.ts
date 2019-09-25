import { RoutineExercise } from './routine-exercise.model';
import { ContentItem } from './index';

export class Routine {
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

    // TODO: Sign automatic
    programmName: string;
    programmId: string;

    exercises: RoutineExercise[];
    warmup: {
        name: string,
        resource: string,
        duration: number
    }[];
    items: ContentItem[];

    constructor() {
        this.exercises = [];
    }
}
