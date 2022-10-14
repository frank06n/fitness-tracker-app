import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Button, Alert } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox"; //https://github.com/WrathChaos/react-native-bouncy-checkbox
import DropdownComponent from "../components/Dropdown";
import Prompt from "../components/Prompt";
import StopWatch from "../components/StopWatch";
import { createNewTask, parseTime_1, parseTime_2, repcountFormat, stringifyTime_1, stringifyTime_2 } from "../Utils";

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 10
    },
    G_startTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    startTime_label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    startTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555'
    },
    dropdown_btn: {
        backgroundColor: '#fff',
        padding: 12,
        paddingHorizontal: 20,
        elevation: 2,
        borderTopLeftRadius: 6, borderTopRightRadius: 6,
        marginTop: 10,
    },
    dropdown_btn_txt: {
        fontSize: 26,
        marginTop: -4,
    },
    dropdown_all: {
        overlayStyle: { alignItems: 'center', backgroundColor: '#2222' },
        dropdownStyle: {
            borderBottomLeftRadius: 6, borderBottomRightRadius: 6,
            maxHeight: 400
        }
    },
    G_timeDisplay: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
        elevation: 2,
        marginVertical: 10,
        paddingVertical: 12
    },
    time_btn: {
        backgroundColor: '#fff',
        width: 80,
        height: 50,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 2,
        marginBottom: 10,
    },
    time_btn_ic: {
        width: 30, height: 30, elevation: 3
    },
    reps_input: {
        backgroundColor: '#fff',
        borderRadius: 6,
        elevation: 2,
        paddingHorizontal: 8, paddingVertical: 4,
    },
    notes_input: {
        backgroundColor: '#fff',
        borderRadius: 6,
        elevation: 2,
        paddingHorizontal: 8, paddingVertical: 4,
        marginTop: 10,
        height: 60,
        textAlignVertical: 'top'
    },
    G_action: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center'
    },
    action_btn: {
        backgroundColor: '#222',
        marginHorizontal: 10,
        width: '30%',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center'
    },
    action_btn_txt: {
        color: '#f2f2f2', fontSize: 16
    },
    restEditComp: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        padding: 16,
        paddingBottom: 8,
        marginTop: 10,
        alignItems: 'center'
    },
    restEditComp_btn: {
        width: '60%',
        paddingHorizontal: 8, paddingVertical: 6,
        borderRadius: 4, borderWidth: 0.3, borderColor: '#555',
        marginBottom: 8,
        backgroundColor: '#fff',
        elevation: 1,
        alignItems: 'center'
    }
});

const TimeDisplay = ({ label, timerOn, extraStyle, setTime, initialTime, checkedState }) => {
    const [hideChecked, setHideChecked] = checkedState;
    const _styles = StyleSheet.create({
        container: {
            flex: 1, paddingHorizontal: 10
        },
        checkBox: {
            paddingHorizontal: 10, paddingVertical: 6,
            alignSelf: 'stretch',
            borderRadius: 4, borderWidth: 0.6, borderColor: '#555',
            marginBottom: 8
        },
        checkBox_iconStyle: { borderColor: '#000' },
        checkBox_textStyle: { color: '#000', fontSize: 18, textAlign: 'center' },
        label: { fontSize: 16, paddingLeft: 10 },
        stopWatch: { fontSize: 26, paddingLeft: 10 }
    });
    return <View
        style={[_styles.container, extraStyle]}
        opacity={hideChecked ? 0.3 : 1}
    >
        <BouncyCheckbox
            size={20} fillColor="black" text="Hide"

            style={_styles.checkBox}
            iconStyle={_styles.checkBox_iconStyle}
            textStyle={_styles.checkBox_textStyle}

            isChecked={hideChecked}
            onPress={() => setHideChecked(!hideChecked)}
            disableBuiltInState={true}
        />
        <Text style={_styles.label}>{label}</Text>
        <StopWatch
            style={_styles.stopWatch}
            start={timerOn}
            setTime={setTime}
            startTime={initialTime}
        />
    </View>;
}

const RestEditComp_btn = (txt, value, setTimeValue, setPromptData) => <TouchableOpacity
    style={styles.restEditComp_btn}
    activeOpacity={0.7}
    onPress={() => {
        setPromptData({
            visible: true,
            title: `Edit ${txt} time`,
            message: `Use this to change ${txt} time`,
            placeholder: `Enter ${txt} time here`,
            defaultValue: txt == "Start" ? stringifyTime_1(value) : stringifyTime_2(value),
            buttons: [
                {
                    text: 'OK', onPress: val => {
                        setTimeValue((txt == "Start") ? parseTime_1(val) : parseTime_2(val));
                        setPromptData({});
                    }
                },
                { text: 'Cancel', onPress: _ => setPromptData({}) },
            ]
        });
    }}
>
    <Text>{`Edit ${txt} time`}</Text>
</TouchableOpacity>;

const RestEditComp = ({ startTime, setStartTime, totalTime, setTotalTime, workTime, setWorkTime }) => {
    const [promptData, setPromptData] = useState({});

    return <View style={styles.restEditComp}>
        {RestEditComp_btn('Start', startTime, setStartTime, setPromptData)}
        {RestEditComp_btn('Total', totalTime, setTotalTime, setPromptData)}
        {RestEditComp_btn('Work', workTime, setWorkTime, setPromptData)}
        <Prompt {...promptData} onPressOutside={() => setPromptData({})} />
    </View>
}

const exerciseList = (() => {
    const data = [
        'Walk', 'Run', 'Jumping Jacks', 'Skipping',
        'Pushups', 'Pullups', 'Squats', 'Lunges',
        'Burpees', 'Situps', 'Crunches', 'Russian Twists', 'Plank',
        'Tricep Extensions', 'Tricep Dips', 'Bicep Curls', 'Benchpress',
        'Hamstring Curls', 'Calf Raises',
    ];
    for (let i = 0; i < data.length; i++) {
        data[i] = { label: data[i], value: i.toString() };
    }
    return data;
})();
const ic_play_src = { uri: 'https://cdn.icon-icons.com/icons2/2226/PNG/512/play_icon_134504.png' };
const ic_pause_src = { uri: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png' };

const RunScreen = ({ navigation, route: { params } }) => {
    const [totalTimerOn, setTotalTimerOn] = useState(false);
    const [workTimerOn, setWorkTimerOn] = useState(false);
    const repcountInput = useRef(null);
    const notesInput = useRef(null);

    const editTaskItem = params && params.editTaskItem;
    const taskItem = editTaskItem ? params.taskItem : createNewTask(undefined);
    const taskIndex = editTaskItem ? params.taskIndex : -1;

    const [exerciseName, setExername] = useState(taskItem.exercise_name);
    const [startTime, setStartTime] = useState(taskItem.start_time);
    const [totalTime, setTotalTime] = useState(taskItem.total_time);
    const [workTime, setWorkTime] = useState(taskItem.work_time);
    const [hideTotalTime, setHideTotalTime] = useState(taskItem.hide_total_time);
    const [hideWorkTime, setHideWorkTime] = useState(taskItem.hide_work_time);
    const [repcount, setRepcount] = useState(taskItem.rep_count);
    const [notes, setNotes] = useState(taskItem.notes);

    const [deTotalTime, setDeTotalTime] = useState(taskItem.total_time);
    const [deWorkTime, setDeWorkTime] = useState(taskItem.work_time);

    const calculateSelectedItem = () => {
        for (let item of exerciseList)
            if (item.label == exerciseName)
                return item;
        return undefined;
    }

    const returnTaskItem = () => {
        // if exercise not selected, show message, {INVALID}
        if (!exerciseName) {
            Alert.alert('Select Exercise', 'No exercise is selected!', [{ text: 'OK' }]);
            return;
        }
        // if timer not started, hide both times
        if (!totalTime) {
            setHideTotalTime(true);
            setHideWorkTime(true);
        }
        else {
            // stop both timers
            setTotalTimerOn(false);
            setWorkTimerOn(false);
        }
        // if repcount in focus, blur, format
        if (repcountInput.current.isFocused()) repcountInput.current.blur();
        if (notesInput.current.isFocused()) notesInput.current.blur();
        // use formatted repcount

        const mItem = {
            exercise_name: exerciseName,
            start_time: startTime,
            total_time: totalTime,
            work_time: workTime,
            hide_total_time: hideTotalTime,
            hide_work_time: hideWorkTime,
            rep_count: repcountFormat(repcount),
            notes: notes
        };
        navigation.navigate('Home', { taskItem: mItem, editTaskItem: editTaskItem, taskIndex: taskIndex });
    }

    return (
        <View style={styles.container}>
            <View style={styles.G_startTime}>
                <Text style={styles.startTime_label}>{'Start time:'}</Text>
                <Text style={styles.startTime}>{stringifyTime_1(startTime)}</Text>
            </View>
            <DropdownComponent
                label="Select Exercise" data={exerciseList}
                selectedItem={calculateSelectedItem()}
                onSelect={(item) => { setExername(item.label) }}
                style={styles.dropdown_btn}
                textStyle={styles.dropdown_btn_txt}
                dropdownAllStyles={styles.dropdown_all}
            />
            <View style={styles.G_timeDisplay}>
                <TimeDisplay
                    label='Total time'
                    timerOn={totalTimerOn}
                    extraStyle={{ borderRightWidth: 0.9, borderColor: '#888' }}
                    setTime={setTotalTime}
                    initialTime={deTotalTime}
                    checkedState={[hideTotalTime, setHideTotalTime]}
                />
                <TimeDisplay
                    label='Work time'
                    timerOn={workTimerOn}
                    setTime={setWorkTime}
                    initialTime={deWorkTime}
                    checkedState={[hideWorkTime, setHideWorkTime]}
                />
            </View>
            {
                !editTaskItem &&
                <TouchableOpacity style={styles.time_btn} onPress={() => {
                    if (!totalTimerOn) setTotalTimerOn(true);
                    setWorkTimerOn(!workTimerOn);
                }}>
                    <Image style={styles.time_btn_ic} source={workTimerOn ? ic_pause_src : ic_play_src} />
                </TouchableOpacity>
            }
            <TextInput
                ref={repcountInput}
                placeholder="Enter your reps (optional)"
                value={repcount}
                style={styles.reps_input}
                onChangeText={text => setRepcount(text)}
                returnKeyType='done'
                onSubmitEditing={ev => setRepcount(repcountFormat(ev.nativeEvent.text))}
                onBlur={() => setRepcount(repcountFormat(repcount))}
            />
            <TextInput
                ref={notesInput}
                placeholder="Enter your notes (optional)"
                value={notes}
                style={styles.notes_input}
                multiline={true}
                onChangeText={text => setNotes(text)}
            />
            {
                editTaskItem &&
                <RestEditComp
                    startTime={startTime}
                    setStartTime={setStartTime}
                    totalTime={totalTime}
                    setTotalTime={setDeTotalTime}
                    workTime={workTime}
                    setWorkTime={setDeWorkTime}
                />
            }
            <View style={styles.G_action}>
                <TouchableOpacity style={styles.action_btn} onPress={() => {
                    Alert.alert(
                        'Cancel this Task?',
                        'WARNING: Data in this page will be lost!',
                        [
                            { text: 'Yes', onPress: () => navigation.navigate('Home') },
                            { text: 'No' }
                        ],
                        { cancelable: true }
                    )
                }}>
                    <Text style={styles.action_btn_txt}>{'CANCEL'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action_btn} onPress={() => {
                    Alert.alert(
                        'Save this Task?', undefined,
                        [
                            { text: 'Yes', onPress: returnTaskItem },
                            { text: 'No' }
                        ],
                        { cancelable: true }
                    )
                }}>
                    <Text style={styles.action_btn_txt}>{'SAVE'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default RunScreen;