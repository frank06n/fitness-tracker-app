import { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from "react-native";
import TaskComp from "../components/TaskComp";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stringifyDate } from "../Utils";
import Prompt from "../components/Prompt";

const TODAY = stringifyDate(new Date());
const listKey_ofDate = date => '@listOf_' + date;

const loadTasks = (date, setTasksList) => {
    AsyncStorage.getItem(listKey_ofDate(date))
        .then(value => setTasksList(JSON.parse(value) || []))
        .catch(error => console.log('load tasks error', error));
};

const saveTasks = (date, tasksList) => {
    AsyncStorage.setItem(listKey_ofDate(date), JSON.stringify(tasksList))
        .then(_ => console.log('save success'))
        .catch(error => console.log('save tasks error', error));
};

const checkTodayInHistory = _ => {
    AsyncStorage.getItem('@history')
        .then(value => {
            const hist = JSON.parse(value) || [];
            if (!hist.includes(TODAY)) {
                hist.push(TODAY);
                hist.sort((a, b) => new Date(a) - new Date(b))
                return AsyncStorage.setItem('@history', JSON.stringify(hist));
            }
        })
        .catch(error => console.log('check today in history error', error))
}

const deleteThisList = (date, navigation) => {
    AsyncStorage.getItem('@history')
        .then(value => {
            const hist = JSON.parse(value) || [];
            hist.splice(hist.indexOf(date), 1);
            return AsyncStorage.setItem('@history', JSON.stringify(hist));
        })
        .then(() => AsyncStorage.removeItem(listKey_ofDate(date)))
        .then(() => navigation.goBack())
        .catch(error => console.log('delete error', error));
}

const renameThisList = (date, newDate, tasksList, setDate) => {
    const d = new Date(newDate);
    if (isNaN(d)) {
        Alert.alert('Invalid date!', 'Please enter a valid date');
        return;
    }
    newDate = stringifyDate(d);

    AsyncStorage.getItem('@history')
        .then(value => {
            const hist = JSON.parse(value) || [];
            if (hist.includes(newDate)) {
                Alert.alert('Invalid date!', 'Provided date already in list');
                return;
            }
            const ix = hist.indexOf(date);
            hist[ix] = newDate;
            hist.sort((a, b) => new Date(a) - new Date(b));
            return AsyncStorage.setItem('@history', JSON.stringify(hist));
        })
        .then(() => AsyncStorage.removeItem(listKey_ofDate(date)))
        .then(() => AsyncStorage.setItem(listKey_ofDate(newDate), JSON.stringify(tasksList)))
        .then(() => setDate(newDate));
}

const ic_add = require('../assets/images/ic_add.png');
const ic_delete = require('../assets/images/ic_delete.png');
const ic_edit_date = require('../assets/images/ic_edit_date.png');
const ic_history = require('../assets/images/ic_history.png');

const HomeScreen = ({ navigation, route: { params } }) => {
    const [tasksList, setTasksList] = useState([]);
    const [date, setDate] = useState(TODAY);
    const [promptData, setPromptData] = useState({});

    const removeTask = n => {
        const newList = [...tasksList];
        newList.splice(n, 1);
        setTasksList(newList);
        saveTasks(date, newList);
    }

    useEffect(() => {
        loadTasks(date, setTasksList);
        checkTodayInHistory();
        navigation.setOptions({
            title: date == TODAY ? 'Today\'s Tasks' : date,
        });
    }, [date]);


    if (params && params.taskItem) {
        Promise.resolve().then(() => {
            if (params.editTaskItem) {
                tasksList[params.taskIndex] = params.taskItem;
            }
            else {
                tasksList.push(params.taskItem);
            }
            saveTasks(date, tasksList);
            navigation.setParams({ taskItem: undefined });
        });
    }
    if (params && params.date) {
        Promise.resolve().then(() => {
            setDate(params.date);
            navigation.setParams({ date: undefined });
        });
    }


    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingVertical: 10 }}
                data={tasksList}
                renderItem={(t) => <TaskComp task={t} removeTask={removeTask} navigate={navigation.navigate} />}
            />
            <View style={styles.G_bottom_btns}>
                <BottomBtn
                    icon={ic_add}
                    onPress={() => navigation.navigate('Run')}
                    extraStyle={{ marginRight: 15 }} />
                {date != TODAY &&
                    <>
                        <BottomBtn
                            icon={ic_edit_date}
                            extraStyle={{ marginRight: 15 }}
                            onPress={() => setPromptData({
                                visible: true,
                                title: `Edit date`,
                                message: 'Enter new date here',
                                placeholder: 'Example: 12-Sep-22',
                                buttons: [
                                    {
                                        text: 'OK', onPress: val => {
                                            renameThisList(date, val, tasksList, setDate);
                                            setPromptData({});
                                        }
                                    },
                                    { text: 'Cancel', onPress: _ => setPromptData({}) },
                                ]
                            })} />
                        <BottomBtn
                            icon={ic_delete}
                            onPress={() => {
                                Alert.alert('Delete this List?'
                                    , 'WARNING: All data in this page will be lost',
                                    [
                                        { text: 'Yes', onPress: () => deleteThisList(date, navigation) },
                                        { text: 'No' }
                                    ],
                                    { cancelable: true })
                            }} />
                        <Prompt {...promptData} onPressOutside={() => setPromptData({})} />
                    </>
                }
                {date == TODAY &&
                    <BottomBtn
                        icon={ic_history}
                        onPress={() => navigation.navigate('History')} />
                }
            </View>
        </View>
    );
}

const BottomBtn = ({ onPress, icon, extraStyle }) => {
    return <TouchableOpacity
        activeOpacity={1}
        style={[styles.bottom_btn, extraStyle]}
        onPress={onPress}
    >
        <Image
            style={{ width: 25, height: 25 }}
            source={icon}
        />
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    G_bottom_btns: {
        flexDirection: 'row',
        height: 50,
        paddingHorizontal: 15, paddingTop: 8,
        elevation: 6,
        backgroundColor: '#fff'
    },
    bottom_btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 6,
        borderWidth: 0.2, borderColor: '#999', borderBottomWidth: 0,
        borderTopRightRadius: 6, borderTopLeftRadius: 6,
    },
    bottom_btn_txt: {
        fontSize: 30
    }
});

export default HomeScreen;