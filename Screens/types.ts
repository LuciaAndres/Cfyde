// types.ts
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MainTabs: undefined; // <-- Aquí dentro vivirán las 4 pestañas (Home, Collection, Map, Inventory)
  Encounter: undefined; // <-- La pantalla oculta a la que vas desde el mapa
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;
