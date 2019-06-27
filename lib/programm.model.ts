import { CategorieItem } from "./index";

export class Programm {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;

    sections: Section[];
    components: Components[];
}

export class Section {
    id: string;
    from: number;
    to: number;
    name: string;
    position: number;
    weekKeys: [];
}

export class Components {
    id: string;
    heading: string;
    type: string;
    isPreview: boolean;
    items: CategorieItem[]
}

