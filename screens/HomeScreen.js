import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import TaskComp from "../components/TaskComp";
import { createNewTask } from "../Utils";

const tasks_list = [
    createNewTask('Run'),
    createNewTask('Squats'),
    createNewTask('Walk'),
    createNewTask('Plank'),
]

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1); // update state to force render
}

const HomeScreen = ({ navigation, route: { params } }) => {
    const forceUpdate = useForceUpdate();

    if (params && params.taskItem) {
        tasks_list.push(params.taskItem);
        navigation.setParams({ taskItem: undefined });
        return;
    }



    const tasks_editor = {
        deleteItem: (n) => {
            tasks_list.splice(n, 1);
            forceUpdate();
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingVertical: 10 }}
                data={tasks_list}
                renderItem={(t) => <TaskComp task={t} editor={tasks_editor} />}
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