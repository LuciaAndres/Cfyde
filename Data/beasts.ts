import { ImageSourcePropType } from 'react-native';
export type Beast = {
    id: string;
    name: string;
    Image: ImageSourcePropType;
    Silhouette: ImageSourcePropType;
    Background: ImageSourcePropType;
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
        name:'Sea Dragon',
        Image:require('../assets/imagenes/DragonDeMar.png'),
        Silhouette:require('../assets/imagenes/DragonDeMarSombra.png') ,
        Background: require('../assets/imagenes/FondoMar.png'),
        probability:60,
        type:"Sea",
        description:"",
        rareza:"Normal"
    },
    {
        id:'2',
        name:'Pointi point',
        Image:require('../assets/imagenes/Erizo.png'),
        Silhouette:require('../assets/imagenes/ErizoSombra.png'),
        Background: require('../assets/imagenes/FondoBosque.png'),
        probability:60,
        type:"Forest",
        description:"",
        rareza:"Normal"
    },
    {
        id:'3',
        name:'Normal Reindeer',
        Image:require('../assets/imagenes/Reno.png'),
        Silhouette:require('../assets/imagenes/RenoSombra.png'),
        Background: require('../assets/imagenes/fondoNieve.png'),
        probability:60,
        type:"Snow",
        description:"",
        rareza:"Normal"
    },
    {
        id:'4',
        name:'Pretty Reindeer',
        Image:require('../assets/imagenes/RenoEspecial.png'),
        Silhouette:require('../assets/imagenes/RenoEspecialSombra.png'),
        Background: require('../assets/imagenes/fondoNieve.png'),
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
        Background: require('../assets/imagenes/FondoEstanque.png'),
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
        Background: require('../assets/imagenes/FondoEstanque.png'),
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
        Background: require('../assets/imagenes/FondoEstanque.png'),
        probability:30,
        type:"Pond",
        description:"",
        rareza:"Rare"
    },
    {
        id:'8',
        name:'El Zorro',
        Image:require('../assets/imagenes/Zorro.png'),
        Silhouette:require('../assets/imagenes/ZorroSombra.png'),
        Background: require('../assets/imagenes/FondoBosque.png'),
        probability:60,
        type:"Forest",
        description:"",
        rareza:"Normal"
    },
    {
        id:'9',
        name:'Turquoise Turtle',
        Image:require('../assets/imagenes/Tortuga.png'),
        Silhouette:require('../assets/imagenes/TortugaSombra.png') ,
        Background: require('../assets/imagenes/FondoMar.png'),
        probability:60,
        type:"Sea",
        description:"",
        rareza:"Normal"
    },
    {
        id:'10',
        name:'Ajolote',
        Image:require('../assets/imagenes/Ajolote.png'),
        Silhouette:require('../assets/imagenes/AjoloteSombra.png'),
        Background: require('../assets/imagenes/FondoEstanque.png'),
        probability:30,
        type:"Pond",
        description:"",
        rareza:"Rare"
    },
];