import { WorkoutSet } from "./index";

export default class ProgressionStatusEntry {
    constructor(public isWeighted: boolean, public sets: WorkoutSet[]) {}
}