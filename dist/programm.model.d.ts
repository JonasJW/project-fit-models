export declare class Programm {
    id: string;
    name: string;
    thumbnailUrl: string;
    sections: Section[];
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
    type: string;
    isPreview: boolean;
}
