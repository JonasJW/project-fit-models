export class ContentItem {
    imageResource: string;
    videoResource: string;
    subheading: string;
    bulletpoints: string[];
    isCarousel = false;
    isVideo = false;
    hasMedia = false;
    carouselItems: ContentItem[];
}
