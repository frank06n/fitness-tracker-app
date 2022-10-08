import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { formatTime12hf } from "../Utils";



const tf = (x) => {
    const m = Math.floor(x / 60);
    const s = x % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,

        marginHorizontal: 16,
        marginVertical: 4,

        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 2,
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    exercise_name: {
        flex: 1,
        fontSize: 18,
    },
    start_time: {
        textAlignVertical: 'center',
        marginRight: 5
    },
    editBtn_img: {
        width: 15, height: 15, margin: 5
    },
    secondRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 12, marginLeft: 6,
    },
    secondRow_item: {
        fontSize: 12
    },
    notesText: {
        fontSize: 12,
        backgroundColor: '#f5f5f5',
        marginRight: 10, marginLeft: 4, marginTop: 12,
        borderRadius: 6, //borderWidth: 0.6, borderColor: '#888',
        paddingHorizontal: 6, paddingVertical: 4,
        elevation: 1.8,
    }
})


const TaskComp = ({ task, editor }) => {
    const task_obj = task;
    task = task.item;
    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    const [notesVis, setNotesVis] = useState(false);

    const deleteTask = () => {
        hideMenu();
        editor.deleteItem(task_obj.index);
    }

    const toggleNotes = () => {
        hideMenu();
        setNotesVis(!notesVis);
    }

    const editBtn = (
        <TouchableOpacity onPress={showMenu}>
            <Image
                style={styles.editBtn_img}
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/61/61140.png' }}
            />
        </TouchableOpacity>
    );

    const editMenu = (
        <Menu
            visible={visible}
            onRequestClose={hideMenu}
            anchor={editBtn}
        >
            <MenuItem onPress={hideMenu}>Edit</MenuItem>
            <MenuItem onPress={deleteTask}>Delete</MenuItem>
            <MenuItem onPress={toggleNotes}>{notesVis ? 'Hide Notes' : 'Show Notes'}</MenuItem>
        </Menu>
    );

    const condit = (check, style, text) => (check ?
        <Text style={style}>{text}</Text> : undefined
    );

    const totalTime = condit(
        !task.hide_total_time,
        styles.secondRow_item,
        'Total: ' + tf(task.total_time)
    );
    const workTime = condit(
        !task.hide_work_time,
        styles.secondRow_item,
        'Work: ' + tf(task.work_time)
    );
    const repCount = condit(
        task.rep_count,
        styles.secondRow_item,
        'Reps: ' + task.rep_count
    );
    const notesText = condit(
        notesVis,
        styles.notesText,
        task.notes
    );

    return <View style={styles.container}>
        <View style={styles.firstRow}>
            <Text style={styles.exercise_name}> {task.exercise_name} </Text>
            <Text style={styles.start_time}> {formatTime12hf(task.start_time)}</Text>
            {editMenu}
        </View>
        <View style={styles.secondRow}>
            {totalTime}
            {workTime}
            {repCount}
        </View>
        {notesText}
    </View>;
};

export default TaskComp;