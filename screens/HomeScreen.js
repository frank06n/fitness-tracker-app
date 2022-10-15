import { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import TaskComp from "../components/TaskComp";
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadTasks = setTasksList => {
    AsyncStorage.getItem('@tasksList')
        .then(value => setTasksList(JSON.parse(value) || []))
        .catch(error => console.log('load tasks error', error));
};

const saveTasks = tasksList => {
    AsyncStorage.setItem('@tasksList', JSON.stringify(tasksList))
        .then(_ => console.log('save success'))
        .catch(error => console.log('save tasks error', error));
};

const ic_add = require('../assets/images/ic_add.png');
const ic_delete = require('../assets/images/ic_delete.png');
const ic_edit_date = require('../assets/images/ic_edit_date.png');
const ic_history = require('../assets/images/ic_history.png');

const HomeScreen = ({ navigation, route: { params } }) => {
    const [tasksList, setTasksList] = useState([]);

    const removeTask = n => {
        const newList = [...tasksList];
        newList.splice(n, 1);
        setTasksList(newList);
        saveTasks(newList);
    }

    useEffect(() => {
        loadTasks(setTasksList);
    }, []);

    if (params && params.taskItem) {
        Promise.resolve().then(() => {
            if (params.editTaskItem) {
                tasksList[params.taskIndex] = params.taskItem;
            }
            else {
                tasksList.push(params.taskItem);
            }
            saveTasks(tasksList);
            navigation.setParams({ taskItem: undefined });
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
                    extraStyle={{ marginRight: 15 }}
                />
                {/* <BottomBtn
                    icon={ic_edit_date}
                    onPress={() => navigation.navigate('Run')}
                    extraStyle={{ marginRight: 15 }}
                />
                <BottomBtn
                    icon={ic_delete}
                    onPress={() => navigation.navigate('Run')}
                /> */}
                <BottomBtn
                    icon={ic_history}
                    onPress={() => navigation.navigate('History')}
                />
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