import { CategorieItem } from "./index";
export declare class Programm {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    sections: Section[];
    components: Components[];
}
export declare class Section {
    id: string;
    from: number;
    to: number;
    name: string;
    position: number;
    weekKeys: [];
}
export declare class Components {
    id: string;
    heading: string;
    type: string;
    isPreview: boolean;
    items: CategorieItem[];
}
