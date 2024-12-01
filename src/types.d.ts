export interface ImageData {
    src: string;
    alt: string;
}

export interface WishType {
    id: number;
    title: string;
    description: string;
    isCompleted?: boolean;
}