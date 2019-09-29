import ProgressionStatusEntry from "./progressiom-status-entry.model";

export default class ExerciseStatusEntry {
    selectedProgression: number;
    progressionEntries: { [ key: string]: ProgressionStatusEntry }

    constructor(selectedProg, progEntries: { [ key: string]: ProgressionStatusEntry }) {
        this.selectedProgression = selectedProg;
        this.progressionEntries = progEntries;
    }
}