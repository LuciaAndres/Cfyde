import { StyleSheet, Text, View } from 'react-native';
import { usePlayer } from '../Context/PlayerContext';

export default function HomeScreen() {

    const { xp, level } = usePlayer();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cfyde</Text>
            <View style={styles.profile}>
                <Text>Player Profile</Text>
                <Text>Level {level}</Text>
                <Text>{xp} XP</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8E9F2',
        padding: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#536B4F',
        marginBottom: 25,
    },

    profile: {
        backgroundColor: '#FFF9EF',
        padding: 20,
        borderRadius: 20,
        gap: 12,
    },
});