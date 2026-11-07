
import { ImageSourcePropType } from 'react-native';

export type Item = {
    id: string;
    name: string;
    image: ImageSourcePropType | null;
    description: string;
    quantity: number;
    effect: number;
    effectType: 'bonus' | 'multiplier' | 'extraAttempt';
};

export const items: Item[] = [
    {
        id: '1',
        name: 'Special fruit',
        image: require('../assets/imagenes/Fruta.png'),
        description: 'Grants an additional capture attempt if the first one fails.',
        quantity: 3,
        effect: 1,
        effectType: 'extraAttempt'
    },
    {
        id: '2',
        name: 'Flower of tranquility',
        image: require('../assets/imagenes/Pocion.png'),
        description: 'Calms the creature, multiplying capture probability by 1.25.',
        quantity: 3,
        effect: 1.25,
        effectType: 'multiplier'
    },
    {
        id: '3',
        name: 'Moss Sphere',
        image: require('../assets/imagenes/Bola.png'),
        description: 'Increases capture probability by 12 percentage points.',
        quantity: 3,
        effect: 12,
        effectType: 'bonus'
       
    }
];
