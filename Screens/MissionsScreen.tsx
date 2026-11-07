import { StyleSheet, Text, View } from 'react-native';

export default function MissionsScreen() {
  return (
    <View style={styles.container}>
      <Text>Missions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});