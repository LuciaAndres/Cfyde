import { StyleSheet, Text, View, FlatList, Image, Button, Pressable, Alert } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { beasts } from '../Data/beasts';
import { useState } from 'react';
import { useEffect } from 'react';
import type { RootStackScreenProps } from './types';
import { items, Item } from '../Data/items';
import { Host, BottomSheet, RNHostView } from '@expo/ui';

import { useInventory } from '../Context/InventoryContext';
import { useCapturedBeasts } from '../Context/CapturedBeastsContext';

type Beast = {
  id: string;
  name: string;
  Image:ImageSourcePropType;
  probability: number;
  type:string;
  description:string;
  rareza:string;

}
export default function EncounterScreen({ navigation }: RootStackScreenProps<'Encounter'>){
 
  //Selector de Items
  const [showItems, setShowItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [selectedBeast, setSelectedBeast] = useState<Beast | null>(null); //Para guardar una criatura y que no salgan todas

  const [activeBonus, setActiveBonus] = useState(0);
  const [activeMultiplier, setActiveMultiplier] = useState(1);
  const [extraAttempt, setExtraAttempt] = useState(false);

  const { currentItems, consumeItem } = useInventory();
  const { addCapturedBeast } = useCapturedBeasts();
  const [itemUsed, setItemUsed] = useState(false);

  const selectItem = (item: Item) => {
    setSelectedItem(item);
  };   
  const capture = () => {
    if (!selectedBeast) return;

    const baseProbability = selectedBeast.probability;

    const finalProbability = Math.min(
        100,
        (baseProbability + activeBonus) * activeMultiplier
    );

    let success = Math.random() * 100 < finalProbability;

    if (!success && extraAttempt) {
        success = Math.random() * 100 < finalProbability;
    }

    if (success) {
      addCapturedBeast(selectedBeast.id);
      Alert.alert('Capture successful!',`You captured ${selectedBeast.name}!`,[
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]);
    } else {
        Alert.alert('Capture failed!',`You captured ${selectedBeast.name}!`,[
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]);
    }
    setActiveBonus(0);
    setActiveMultiplier(1);
    setExtraAttempt(false);
    setItemUsed(false);
  };
  const randomCreature = () =>{
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let selectedRarity = "";

    if (randomNumber <= 70) {
      selectedRarity = "Normal";
    } else if (randomNumber <= 95) {
      selectedRarity = "Rare";
    } else {
      selectedRarity = "Extra Rare";
    }

    const availableBeasts = beasts.filter(
      (beast) => beast.rareza === selectedRarity
    );
    if (availableBeasts.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableBeasts.length);

    const randomBeast = availableBeasts[randomIndex];

    setSelectedBeast(randomBeast);
  }
  const useSelectedItem = () => {
      if (!selectedItem) return;

      const item = currentItems.find(
          i => i.id === selectedItem.id
      );
      

      if (!item || item.quantity <= 0) return;
      if (itemUsed) return;

      consumeItem(item.id);
     
      if (item.effectType === 'bonus') {
          setActiveBonus(item.effect);
      }

      if (item.effectType === 'multiplier') {
          setActiveMultiplier(item.effect);
      }

      if (item.effectType === 'extraAttempt') {
          setExtraAttempt(true);
      }
      setItemUsed(true);
      setSelectedItem(null);
      setShowItems(false);
  };
  useEffect(() => {
     randomCreature();
  }, []);

  return (
    <View style={styles.container}>
       <View style={styles.creatureContainer}>
        {selectedBeast && (
          <>
            <Text style={styles.name}>
              {selectedBeast.name}
            </Text>
            <Image
              source={selectedBeast.Image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.rarity}>
              {selectedBeast.rareza}
            </Text>

            <Text style={styles.description}>
              {selectedBeast.probability}
            </Text>
            {activeBonus > 0 && (
                <Text>Moss Sphere: +{activeBonus}% capture chance</Text>
            )}

            {activeMultiplier > 1 && (
                <Text>Flower of tranquility: x{activeMultiplier}</Text>
            )}

            {extraAttempt && (
                <Text>Special fruit: Extra attempt available</Text>
            )}
          </>

        )}

      </View>
      <BottomSheet
        isPresented={showItems}
        onDismiss={() => setShowItems(false)}
        snapPoints={['half']}
      >
        <RNHostView matchContents>
          <View style={styles.sheetContainer}>
            <Text style={styles.sheetTitle}> Choose an item </Text>
            <Text style={styles.sheetSubtitle}> Select an item to use during the capture.</Text>
            <FlatList
              data={currentItems.filter(item => item.quantity > 0)}
              numColumns={3}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={styles.itemsRow}
              renderItem={({ item }) => (
                <Pressable style={[ styles.itemCard,selectedItem?.id === item.id && styles.selectedItem]} onPress={() => selectItem(item)}>
                  {item.image ? (
                    <Image source={item.image} style={styles.itemImage} resizeMode="contain"/>
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Text>?</Text>
                    </View>
                  )}
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}> x{item.quantity} </Text>
                </Pressable>
              )}
            />
            <Button
                title="Choose item"
                disabled={selectedItem === null}
                onPress={useSelectedItem}
            />

          </View>
        </RNHostView>
      </BottomSheet>
      <View style={styles.buttonsContainer}>       
        <Button title="Items"  onPress={() => setShowItems(true)}/>  
        <Button title='Capture' onPress={capture}/>
        <Button title='Flee' onPress={(() => navigation.goBack())} />  
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({  
container: {
  flex: 1,
  backgroundColor: '#FFF9EF',
  padding: 20,
},

creatureContainer: {
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#F8F2E6',
  borderRadius: 26,
  borderWidth: 1,
  borderColor: '#E9DCC5',
  padding: 15,
  marginBottom: 15,
},

image: {
  width: 280,
  height: 280,
},

name: {
  fontSize: 26,
  fontWeight: 'bold',
  color: '#536B4F',
  marginTop: 15,
  textAlign: 'center',
},

rarity: {
  fontSize: 15,
  fontWeight: '600',
  color: '#B58A69',
  marginTop: 5,
  backgroundColor: '#F1E5D4',
  paddingHorizontal: 14,
  paddingVertical: 5,
  borderRadius: 20,
  overflow: 'hidden',
},

description: {
  fontSize: 14,
  color: '#887C69',
  textAlign: 'center',
  lineHeight: 21,
  marginTop: 12,
  paddingHorizontal: 8,
},

buttonsContainer: {
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 10,
  paddingBottom: 60,
},




  //Estilos Selector Items
    
  sheetContainer: {
    padding: 20,
    paddingBottom: 30,
    height: 340,
    backgroundColor: '#FFF9EF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 1,
    borderColor: '#E9DCC5',
  },

  sheetTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#536B4F',
    marginBottom: 5,
  },

  sheetSubtitle: {
    fontSize: 13,
    color: '#9A8975',
    marginBottom: 20,
  },

  itemsRow: {
    justifyContent: 'flex-start',
    gap: 10,
  },

  itemCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#FFFCF6',
    borderWidth: 1.5,
    borderColor: '#E8DCC8',
    borderRadius: 18,
  },

  selectedItem: {
    borderColor: '#91A979',
    borderWidth: 2,
    backgroundColor: '#EEF3E6',
  },

  itemImage: {
    width: 65,
    height: 65,
  },

  imagePlaceholder: {
    width: 65,
    height: 65,
    backgroundColor: '#F2EBDD',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5D604B',
    textAlign: 'center',
    marginTop: 5,
  },

  itemQuantity: {
    fontSize: 12,
    color: '#A18D76',
    marginTop: 3,
  },
});