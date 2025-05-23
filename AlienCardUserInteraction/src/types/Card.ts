export interface Card {
    id: string;
    name: string;
    imageUrl: string;
    description?: string;
}

export interface CardPosition {
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

export type AnimationState = 'initial' | 'drawing' | 'revealed' | 'hidden'; 