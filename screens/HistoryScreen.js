import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { stringifyDate } from "../Utils";


const TODAY = stringifyDate(new Date());

const ListItem = (props) => {
    if (props.item == TODAY) return;
    return <TouchableOpacity
        style={styles.list_item}
        activeOpacity={0.7}
        onPress={() => props.onItemPress(props.index)}>
        <Text style={styles.list_item_txt}>{props.item}</Text>
    </TouchableOpacity>
}

const HistoryScreen = ({ navigation }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('@history')
                .then(value => setHistory(JSON.parse(value) || []));
        });

        return unsubscribe;
    }, [navigation]);

    return <View style={styles.container}>
        <FlatList
            style={styles.list}
            contentContainerStyle={{ paddingVertical: 10 }}
            data={history}
            renderItem={props =>
                <ListItem {...props} onItemPress={i => {
                    navigation.push('Home', { date: history[i] });
                }} />
            }
        />
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.add}
            onPress={() => {
                const last = history[history.length - 1];
                const newDate = stringifyDate(new Date(new Date(last).getTime() + 86400 * 1000));
                AsyncStorage.setItem('@history', JSON.stringify([...history, newDate]));
                navigation.push('Home', { date: newDate });
            }}
        >
            <Image
                style={{ width: 25, height: 25 }}
                source={require('../assets/images/ic_add.png')}
            />
        </TouchableOpacity>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    list_item: {
        flex: 1,
        padding: 10,
        alignItems: 'center',

        marginHorizontal: 16,
        marginVertical: 4,

        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 2,
    },
    list_item_txt: {
        fontSize: 16,
    },
    add: {
        width: '100%',
        backgroundColor: 'white',
        elevation: 10,
        padding: 14,
        alignItems: 'center'
    }
});

export default HistoryScreen;

