import { Timings } from "./exercise.model";

export default class Progression {
    id: string;
    name: string;
    resource: string;
    intensity: string;
    repRange: string;
    isWeighted: boolean = false;
    isDynamic: boolean;
    isPush: boolean;
    isDefault: boolean;
    isBilateral: boolean;
    timings: Timings;
}