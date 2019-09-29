import { WorkoutSet } from "./index";
export default class ProgressionStatusEntry {
    isWeighted: boolean;
    sets: WorkoutSet[];
    constructor(isWeighted: boolean, sets: WorkoutSet[]);
}
