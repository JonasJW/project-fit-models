import { ContentItem } from './content-item.model';

export class Tutor {
    id: string;
    name: string;
    resourceUrl: string;
    items: ContentItem[] = [];
}
