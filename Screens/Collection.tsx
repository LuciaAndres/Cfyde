
import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import { beasts } from '../Data/beasts';
import { useCapturedBeasts } from '../Context/CapturedBeastsContext';

export default function Collection() {

    const { capturedBeasts } = useCapturedBeasts();
    const discoveredCount = capturedBeasts.filter(
        beast => beast.quantity > 0
    ).length;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Bestiary</Text>
          <Text style={styles.subtitle}>Your collection of discovered creatures</Text>
          <Text style={styles.progress}> {discoveredCount} / {beasts.length} discovered </Text>
        </View>

        <FlatList
          data={beasts}
          numColumns={2}
          keyExtractor={item => item.id}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const captured = capturedBeasts.find(
              beast => beast.id === item.id
            );
            const isDiscovered = (captured?.quantity ?? 0) > 0;
            return (
              <Pressable style={styles.card}>
                <Image
                   source={
                    isDiscovered
                    ? item.Image
                    : item.Silhouette
                    }
                    style={styles.image} resizeMode="contain"/>
                    <Text style={styles.name}> {isDiscovered ? item.name : '???'} </Text>
                    {isDiscovered ? (
                      <>
                      <Text style={styles.rarity}> {item.rareza} </Text>
                      <Text style={styles.quantity}> Captured: {captured?.quantity} </Text>
                      </>
                      ) : (
                      <Text style={styles.locked}> Undiscovered </Text>
                    )}
              </Pressable>
            );
          }}
        />

      </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF9EF',
        padding: 16,
    },

    header: {
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 10,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#536B4F',
    },

    subtitle: {
        fontSize: 13,
        color: '#9A8975',
        marginTop: 5,
    },

    progress: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#B58A69',
        marginTop: 12,
    },

    list: {
        paddingBottom: 30,
    },

    row: {
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 12,
    },

    card: {
        flex: 1,
        backgroundColor: '#F8F2E6',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E9DCC5',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: '100%',
        height: 145,
    },

    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#536B4F',
        textAlign: 'center',
        marginTop: 8,
    },

    rarity: {
        fontSize: 12,
        color: '#B58A69',
        marginTop: 5,
    },

    quantity: {
        fontSize: 12,
        color: '#887C69',
        marginTop: 5,
    },

    locked: {
        fontSize: 12,
        color: '#A18D76',
        marginTop: 5,
    },

});
