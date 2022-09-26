import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import TaskComp from "../components/TaskComp";
import { createNewTask } from "../Utils";

const _tranddur = () => Math.floor(Math.random()*300)+180; // temp random duration

const tasks_list = [
    createNewTask('Pushup'),
    createNewTask('Run'),
    createNewTask('Squat'),
    createNewTask('Walk'),
    createNewTask('Streching'),
    createNewTask('Plank'),
    createNewTask('Walk'),
]

function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1); // update state to force render

}

const HomeScreen = ({navigation}) => {
    const forceUpdate = useForceUpdate();

    
    
    const tasks_editor = {
        deleteItem: (n) => {
            tasks_list.splice(n, 1);
            forceUpdate();
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{flex:1}}
                contentContainerStyle={{ paddingVertical: 10 }}
                data={tasks_list}
                renderItem={(t) => <TaskComp task={t} editor={tasks_editor}/>}
            />
            <TouchableOpacity activeOpacity={1} style={styles.add_btn}
            onPress={() => {
                //tasks_list.push(createNewTask('Pushup'));
                //forceUpdate();
                navigation.navigate('Run');
            }}>
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
        height:50,
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