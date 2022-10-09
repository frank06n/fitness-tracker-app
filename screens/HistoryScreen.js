import { StyleSheet, Text, View } from "react-native";

const HistoryScreen = () => {
    return <View style={styles.container}>
        <Text>This is history screen</Text>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HistoryScreen;

