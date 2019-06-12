export class Preset {
    id: string;
    name: string;
    isDynamic: boolean;
    isPush: boolean;
    isBilateral: boolean;
    progressions: string[];

    constructor() {
        this.name = "";
        this.isDynamic = false;
        this.isPush = false;
        this.isBilateral = false;
        this.progressions = [];
    }
}
