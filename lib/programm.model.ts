export class Programm {
    id: string;
    name: string;
    description: string;
    thumbnailUrl: string;

    sections: Section[];
    components: any; // TODO: 
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

