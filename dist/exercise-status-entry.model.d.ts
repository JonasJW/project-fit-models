import ProgressionStatusEntry from "./progressiom-status-entry.model";
export default class ExerciseStatusEntry {
    selectedProgression: number;
    progressionEntries: {
        [key: string]: ProgressionStatusEntry;
    };
    constructor(selectedProg: any, progEntries: {
        [key: string]: ProgressionStatusEntry;
    });
}
