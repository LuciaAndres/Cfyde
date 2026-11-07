import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { items} from '../Data/items';
import { useInventory } from '../Context/InventoryContext';

export default function InventoryScreen() { 
  const { currentItems } = useInventory();

  return (
    <View style={styles.container}>
      <FlatList
        data={currentItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>

            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <Text style={styles.quantity}>
              x{item.quantity}
            </Text>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
    margin: 6,    
  },

  itemContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F2E6',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E9DCC5',
    padding: 15,
    margin: 6,
  },

  image: {
    width: 110,
    height: 110,    
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,    
  },

  description: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },

  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});