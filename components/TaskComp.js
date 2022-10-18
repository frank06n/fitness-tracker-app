import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { COLOR, stringifyTime_1, stringifyTime_2 } from "../Utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,

        marginHorizontal: 16,
        marginVertical: 4,

        borderRadius: 5,
        backgroundColor: COLOR.primary,
        elevation: 2,
    },
    firstRow: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    exercise_name: {
        flex: 1,
        fontSize: 18,
        color: COLOR.antiPlus,
    },
    start_time: {
        textAlignVertical: 'center',
        marginRight: 5,
        color: COLOR.antiPlus,
    },
    editBtn_img: {
        width: 20, height: 20, tintColor: COLOR.antiPlus
    },
    secondRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 12, marginLeft: 6,
    },
    secondRow_item: {
        fontSize: 12,
        color: COLOR.anti,
    },
    notesText: {
        fontSize: 12,
        backgroundColor: COLOR.primaryLight,
        marginRight: 10, marginLeft: 4, marginTop: 12,
        borderRadius: 6,
        paddingHorizontal: 6, paddingVertical: 4,
        elevation: 1.8,
        color: COLOR.anti,
    }
})


const TaskComp = ({ task: task_obj, removeTask, navigate }) => {

    const task = task_obj.item;
    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    const [notesVis, setNotesVis] = useState(false);

    const editTask = () => {
        hideMenu();
        navigate('Run', { editTaskItem: true, taskItem: task, taskIndex: task_obj.index });
    }

    const removeThisTaskComp = () => {
        hideMenu();
        removeTask(task_obj.index);
    }

    const toggleNotes = () => {
        hideMenu();
        setNotesVis(!notesVis);
    }

    const editBtn = (
        <TouchableOpacity onPress={showMenu}>
            <Image
                style={styles.editBtn_img}
                source={require('../assets/images/ic_three_dots.png')}
            />
        </TouchableOpacity>
    );

    const editMenu = (
        <Menu
            visible={visible}
            onRequestClose={hideMenu}
            anchor={editBtn}
        >
            <MenuItem onPress={editTask}>Edit</MenuItem>
            <MenuItem onPress={removeThisTaskComp}>Delete</MenuItem>
            <MenuItem onPress={toggleNotes}>{notesVis ? 'Hide Notes' : 'Show Notes'}</MenuItem>
        </Menu>
    );

    const condit = (check, style, text) => (check ?
        <Text style={style}>{text}</Text> : undefined
    );

    const totalTime = condit(
        !task.hide_total_time,
        styles.secondRow_item,
        'Total: ' + stringifyTime_2(task.total_time)
    );
    const workTime = condit(
        !task.hide_work_time,
        styles.secondRow_item,
        'Work: ' + stringifyTime_2(task.work_time)
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
            <Text style={styles.start_time}> {stringifyTime_1(task.start_time)}</Text>
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