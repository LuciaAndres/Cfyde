import { ImageSourcePropType } from 'react-native';
export type Beast = {
    id: string;
    name: string;
    Image: ImageSourcePropType;
    Silhouette: ImageSourcePropType;
    probability: number;
    type: string;
    description: string;
    rareza: string;
};

export type CapturedBeast = {
    id: string;
    quantity: number;
};
export const beasts: Beast[] = [
    {
        id:'1',
        name:'',
        Image:require('../assets/imagenes/DragonDeMar.png'),
        Silhouette:require('../assets/imagenes/DragonDeMarSombra.png') ,
        probability:60,
        type:"Sea",
        description:"",
        rareza:"Normal"
    },
    {
        id:'2',
        name:'',
        Image:require('../assets/imagenes/Lince.png'),
        Silhouette:require('../assets/imagenes/LinceSombra.png'),
        probability:60,
        type:"Forest",
        description:"",
        rareza:"Normal"
    },
    {
        id:'3',
        name:'',
        Image:require('../assets/imagenes/Reno.png'),
        Silhouette:require('../assets/imagenes/RenoSombra.png'),
        probability:60,
        type:"Snow",
        description:"",
        rareza:"Normal"
    },
    {
        id:'4',
        name:'',
        Image:require('../assets/imagenes/RenoEspecial.png'),
        Silhouette:require('../assets/imagenes/RenoEspecialSombra.png'),
        probability:30,
        type:"",
        description:"Snow",
        rareza:"Rare"
    },
    {
        id:'5',
        name:'Daisyless Picklefrog',
        Image:require('../assets/imagenes/Rana.png'),
        Silhouette:require('../assets/imagenes/RanaSombra.png'),
        probability:60,
        type:"Pond",
        description:"",
        rareza:"Normal"
    },
    {
        id:'6',
        name:'Piclefrog\'s distant cousin',
        Image:require('../assets/imagenes/RanaRosa.png'),
        Silhouette:require('../assets/imagenes/RanaRosaSombra.png'),
        probability:10,
        type:"Pond",
        description:"",
        rareza:"Extra Rare"
    },
    {
        id:'7',
        name:'Daisy Picklefrog',
        Image:require('../assets/imagenes/RanaBlanca.png'),
        Silhouette:require('../assets/imagenes/RanaBlancaSombra.png'),
        probability:30,
        type:"Pond",
        description:"",
        rareza:"Rare"
    },
    {
        id:'8',
        name:'',
        Image:require('../assets/imagenes/Zorro.png'),
        Silhouette:require('../assets/imagenes/ZorroSombra.png'),
        probability:60,
        type:"Forest",
        description:"",
        rareza:"Normal"
    }
];