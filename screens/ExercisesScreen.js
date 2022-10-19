import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Prompt from "../components/Prompt";
import { COLOR, stringifyDate } from "../Utils";


const TODAY = stringifyDate(new Date());

const ListItem = (props) => {
    if (props.item == TODAY) return;
    return <TouchableOpacity
        style={styles.list_item}
        activeOpacity={0.7}
        onLongPress={() => props.onItemLongPress(props.item)}>
        <Text style={styles.list_item_txt}>{props.item}</Text>
    </TouchableOpacity>
}

const ExercisesScreen = ({ navigation }) => {
    const [exercises, setExercises] = useState([]);
    const [promptData, setPromptData] = useState({});

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('@exercises')
                .then(value => setExercises(JSON.parse(value) || []));
        });

        return unsubscribe;
    }, [navigation]);

    return <View style={styles.container}>
        <FlatList
            style={styles.list}
            contentContainerStyle={{ paddingVertical: 10 }}
            data={exercises}
            renderItem={props =>
                <ListItem {...props} onItemLongPress={item => {
                    Alert.alert('Delete this exercise?'
                        , `WARNING: Exercise '${item}' will be deleted from the list`,
                        [
                            {
                                text: 'Yes', onPress: () => {
                                    AsyncStorage.getItem('@exercises')
                                        .then(value => {
                                            const exr = JSON.parse(value);
                                            if (!exr.includes(item)) return;
                                            exr.splice(exr.indexOf(item), 1);
                                            AsyncStorage.setItem('@exercises', JSON.stringify(exr));
                                            setExercises([...exr]);
                                        });
                                }
                            },
                            { text: 'No' }
                        ],
                        { cancelable: true })
                }} />
            }
        />
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.add}
            onPress={() => setPromptData({
                visible: true,
                title: `Add exercise`,
                message: 'Enter name of exercise',
                placeholder: 'Example: Pushups',
                buttons: [
                    {
                        text: 'OK', onPress: val => {
                            AsyncStorage.getItem('@exercises')
                                .then(value => {
                                    const exr = JSON.parse(value);
                                    if (exr.includes(val)) return;
                                    const newExercises = [...exr, val];
                                    AsyncStorage.setItem('@exercises', JSON.stringify(newExercises));
                                    setExercises(newExercises);
                                });
                            setPromptData({});
                        }
                    },
                    { text: 'CANCEL', onPress: _ => setPromptData({}) },
                ]
            })}
        >
            <Image
                style={{ width: 25, height: 25, tintColor: COLOR.anti }}
                source={require('../assets/images/ic_add.png')}
            />
        </TouchableOpacity>
        <Prompt {...promptData} onPressOutside={() => setPromptData({})} />
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.primaryDark,
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
        backgroundColor: COLOR.primary,
        elevation: 2,
    },
    list_item_txt: {
        fontSize: 16,
        color: COLOR.anti,
    },
    add: {
        width: '100%',
        backgroundColor: COLOR.primary,
        elevation: 10,
        padding: 14,
        alignItems: 'center'
    }
});

export default ExercisesScreen;

