export class NewsItem {
  id: string;
  position: number;
  resourceUrl: string;
  resource: string;
  resourceSm: string;
  title: string;
  subtitle: string;
  type: string;
  link: string;

  constructor(title: string, subtitle: string, position: number, resourceUrl: string, type: string, link: string ) {
    this.position = position;
    this.title = title;
    this.subtitle = subtitle;
    this.resourceUrl = resourceUrl;
    this.type = type;
    this.link = link;
  }
}
