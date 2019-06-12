export class Programm {
    id: string;
    name: string;
    thumbnailUrl: string;

    sections: Section[];
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
    type: string;
    isPreview: boolean;
}

