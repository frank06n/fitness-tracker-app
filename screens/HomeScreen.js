import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import TaskComp from "../components/TaskComp";
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadTasks = setTasksList => {
    AsyncStorage.getItem('@tasksList')
        .then(value => setTasksList(JSON.parse(value)))
        .catch(error => console.log('load tasks error', error));
};

const saveTasks = tasksList => {
    AsyncStorage.setItem('@tasksList', JSON.stringify(tasksList))
        .then(_ => console.log('save success'))
        .catch(error => console.log('save tasks error', error));
};

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
            tasksList.push(params.taskItem);
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
                renderItem={(t) => <TaskComp task={t} removeTask={removeTask} />}
            />
            <TouchableOpacity
                activeOpacity={1}
                style={styles.add_btn}
                onPress={() => navigation.navigate('Run')}
            >
                <Text style={styles.add_btn_text}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    add_btn: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 6
    },
    add_btn_text: {
        fontSize: 30
    }
});

export default HomeScreen;