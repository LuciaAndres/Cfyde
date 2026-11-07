import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import Collection from './Screens/Collection';
import Inventory from './Screens/InventoryScreen';
import MapScreen from './Screens/MapScreen';
import EncounterScreen from './Screens/EncounterScreen'; 

import { InventoryProvider } from './Context/InventoryContext';
import { CapturedBeastsProvider } from './Context/CapturedBeastsContext';

import type { RootStackParamList } from './types';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { 
        backgroundColor: '#f0afe5', 
        borderTopWidth: 0,         
        elevation: 0               
      }
    }}>        
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
         tabBarIcon: () => ( 
          <Image 
            source={require('./assets/imagenes/CasaIcon.png')} 
            style={{ width: 50, height: 50 }} 
          />
        )
        }} 
      />
      <Tab.Screen 
        name="Collection" 
        component={Collection}
        options={{
         tabBarIcon: () => ( 
          <Image 
            source={require('./assets/imagenes/LibroIcon.png')} 
            style={{ width: 50, height: 50 }} 
          />
         )
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{
         tabBarIcon: () => ( 
          <Image 
            source={require('./assets/imagenes/MapaIcon.png')} 
            style={{ width: 50, height: 50 }} 
          />
         )
        }}
      />
      <Tab.Screen 
        name="Inventory" 
        component={Inventory}
        options={{
         tabBarIcon: () => ( 
          <Image 
            source={require('./assets/imagenes/MochilaIcon.png')} 
            style={{ width: 50, height: 50 }} 
          />
         )
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <InventoryProvider>
      <CapturedBeastsProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Encounter" component={EncounterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CapturedBeastsProvider>
    </InventoryProvider>
  );
}
