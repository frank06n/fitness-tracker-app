import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Button, Alert, ScrollView, BackHandler } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox"; //https://github.com/WrathChaos/react-native-bouncy-checkbox
import DropdownComponent from "../components/Dropdown";
import Prompt from "../components/Prompt";
import StopWatch from "../components/StopWatch";
import { COLOR, createNewTask, parseTime_1, parseTime_2, repcountFormat, stringifyTime_1, stringifyTime_2 } from "../Utils";

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 10,
        backgroundColor: COLOR.primaryDark,
    },
    G_startTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    startTime_label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLOR.anti,
    },
    startTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLOR.antiMinus,
    },
    dropdown_btn: {
        backgroundColor: COLOR.primary,
        padding: 12,
        paddingHorizontal: 20,
        elevation: 2,
        borderTopLeftRadius: 6, borderTopRightRadius: 6,
        marginTop: 10,
    },
    dropdown_btn_txt: {
        fontSize: 26,
        marginTop: -4,
        color: COLOR.anti,
    },
    dropdown_all: {
        overlayStyle: { alignItems: 'center', backgroundColor: COLOR.primaryDark + '99' },
        style: {
            backgroundColor: COLOR.primary,
            borderBottomLeftRadius: 6, borderBottomRightRadius: 6,
        },
        searchStyle: {
            color: COLOR.anti,
            placeholderTextColor: COLOR.antiMinus,
            borderColor: COLOR.antiMinus,
        },
        itemStyle: {
            borderColor: COLOR.antiMinus,
        },
        itemTextStyle: {
            color: COLOR.anti,
        }
    },
    G_timeDisplay: {
        flexDirection: 'row',
        borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
        elevation: 2,
        marginVertical: 10,
        paddingVertical: 12,
        backgroundColor: COLOR.primary,
    },
    time_btn: {
        width: 80,
        height: 50,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 2,
        marginBottom: 10,
        backgroundColor: COLOR.primary,
    },
    time_btn_ic: {
        width: 30, height: 30, elevation: 3, tintColor: COLOR.anti
    },
    reps_input: {
        backgroundColor: COLOR.primary,
        color: COLOR.anti,
        borderRadius: 6,
        elevation: 2,
        paddingHorizontal: 8, paddingVertical: 4,
    },
    notes_input: {
        backgroundColor: COLOR.primary,
        color: COLOR.anti,
        borderRadius: 6,
        elevation: 2,
        paddingHorizontal: 8, paddingVertical: 4,
        marginTop: 10,
        height: 60,
        textAlignVertical: 'top'
    },
    G_action: {
        flexDirection: 'row',
        marginVertical: 30,
        justifyContent: 'center',
        elevation: 2,
    },
    action_btn: {
        backgroundColor: COLOR.primary,
        marginHorizontal: 10,
        width: '30%',
        padding: 10,
        borderRadius: 6,
        elevation: 2,
        alignItems: 'center'
    },
    action_btn_txt: {
        color: COLOR.anti, fontSize: 16,
    },
    restEditComp: {
        backgroundColor: COLOR.primary,
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
        borderRadius: 4, borderWidth: 0.3, borderColor: COLOR.primaryDark,
        marginBottom: 8,
        backgroundColor: COLOR.primary,
        elevation: 2,
        alignItems: 'center'
    },
    restEditComp_btn_txt: {
        color: COLOR.anti,
    }
});

const TimeDisplay = ({ label, timerOn, extraStyle, setTime, initialTime, checkedState, precision }) => {
    const [hideChecked, setHideChecked] = checkedState;
    const _styles = StyleSheet.create({
        container: {
            flex: 1, paddingHorizontal: 10
        },
        checkBox: {
            paddingHorizontal: 10, paddingVertical: 6,
            alignSelf: 'stretch',
            borderRadius: 4, borderWidth: 0.6, borderColor: COLOR.anti,
            marginBottom: 8
        },
        checkbox_innerIconStyle: { borderColor: COLOR.anti, backgroundColor: COLOR.primaryLight },
        checkBox_textStyle: { color: COLOR.anti, fontSize: 18, textAlign: 'center' },
        label: { fontSize: 16, paddingLeft: 10, color: COLOR.anti, },
        stopWatch: { fontSize: 26, paddingLeft: 10, color: COLOR.anti, }
    });
    return <View
        style={[_styles.container, extraStyle]}
        opacity={hideChecked ? 0.3 : 1}
    >
        <BouncyCheckbox
            size={20} fillColor="black" text="Hide"

            style={_styles.checkBox}
            innerIconStyle={_styles.checkbox_innerIconStyle}
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
            updateInterval={precision == 'lazy' ? 1000 : precision == 'mid' ? 500 : 100}
        />
    </View>;
}

const RestEditComp_btn = (txt, value, setTimeValue, setPromptData) => <TouchableOpacity
    style={styles.restEditComp_btn}
    activeOpacity={0.7}
    onPress={() => setPromptData({
        visible: true,
        title: `Edit ${txt} time`,
        message: `Use this to change ${txt} time`,
        placeholder: `Enter ${txt} time here`,
        defaultValue: txt == "Start" ? stringifyTime_1(value) : stringifyTime_2(value),
        buttons: [
            {
                text: 'OK', onPress: val => {
                    const timeVal = (txt == "Start") ? parseTime_1(val) : parseTime_2(val);
                    const invalidAlert = _ => Alert.alert(
                        'Invalid input!', (txt == "Start") ?
                        'Valid format: hh:mm am/pm\nExample: 08:12 am' :
                        'Valid format: mm:ss.deci \nExample: 6:32.3',
                    );

                    if (isNaN(timeVal)) Promise.resolve().then(invalidAlert);
                    else setTimeValue(timeVal);
                    setPromptData({});
                }
            },
            { text: 'CANCEL', onPress: _ => setPromptData({}) },
        ]
    })}
>
    <Text style={styles.restEditComp_btn_txt}>{`Edit ${txt} time`}</Text>
</TouchableOpacity>;

const RestEditComp = ({ startTime, setStartTime, totalTime, setTotalTime, workTime, setWorkTime }) => {
    const [promptData, setPromptData] = useState({});

    return <View style={styles.restEditComp}>
        {RestEditComp_btn('Start', startTime, setStartTime, setPromptData)}
        {RestEditComp_btn('Total', totalTime, setTotalTime, setPromptData)}
        {RestEditComp_btn('Work', workTime, setWorkTime, setPromptData)}
        <Prompt {...promptData} onRequestClose={() => setPromptData({})} />
    </View>
}

const ic_play_src = require('../assets/images/ic_play.png');
const ic_pause_src = require('../assets/images/ic_pause.png');

const RunScreen = ({ navigation, route: { params } }) => {
    const [totalTimerOn, setTotalTimerOn] = useState(false);
    const [workTimerOn, setWorkTimerOn] = useState(false);
    const repcountInput = useRef(null);
    const notesInput = useRef(null);

    const editTaskItem = params && params.editTaskItem;
    const taskItem = editTaskItem ? params.taskItem : createNewTask(undefined);
    const taskIndex = editTaskItem ? params.taskIndex : -1;

    const [exerciseList, setExerciseList] = useState([]);
    const [exerciseName, setExerciseName] = useState(taskItem.exercise_name);
    const [startTime, setStartTime] = useState(taskItem.start_time);
    const [totalTime, setTotalTime] = useState(taskItem.total_time);
    const [workTime, setWorkTime] = useState(taskItem.work_time);
    const [hideTotalTime, setHideTotalTime] = useState(taskItem.hide_total_time);
    const [hideWorkTime, setHideWorkTime] = useState(taskItem.hide_work_time);
    const [repcount, setRepcount] = useState(taskItem.rep_count);
    const [notes, setNotes] = useState(taskItem.notes);

    const [deTotalTime, setDeTotalTime] = useState(taskItem.total_time);
    const [deWorkTime, setDeWorkTime] = useState(taskItem.work_time);
    const [timerPrecision, setTimerPrecision] = useState('mid');

    const onRequestTaskCancel = () => {
        Alert.alert(
            'Cancel this Task?',
            'WARNING: Data in this page will be lost!',
            [
                { text: 'Yes', onPress: () => navigation.navigate('Home') },
                { text: 'No' }
            ],
            { cancelable: true }
        )
        return true; // for back handler
    }

    useEffect(() => {
        AsyncStorage.getItem('@exercises')
            .then(value => setExerciseList(JSON.parse(value)));
        AsyncStorage.getItem('@timerPrecision')
            .then(value => {
                if (value) setTimerPrecision(value);
                else AsyncStorage.setItem('@timerPrecision', 'mid');
            });
        navigation.setOptions({
            headerLeft: () => <></>,
            title: editTaskItem ? 'Edit Task' : 'Create Task',
        });
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            onRequestTaskCancel
        );

        return () => backHandler.remove();
    }, []);

    const returnTaskItem = () => {
        let hideBothTimers = false;

        if (!exerciseName) {
            Alert.alert('Select Exercise', 'No exercise is selected!', [{ text: 'OK' }]);
            return;
        }

        if (!editTaskItem) {
            if (!totalTime) {
                hideBothTimers = true;
            }
            else {
                setTotalTimerOn(false);
                setWorkTimerOn(false);
            }
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
            hide_total_time: hideBothTimers || hideTotalTime,
            hide_work_time: hideBothTimers || hideWorkTime,
            rep_count: repcountFormat(repcount),
            notes: notes
        };
        navigation.navigate('Home', { taskItem: mItem, editTaskItem: editTaskItem, taskIndex: taskIndex });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.G_startTime}>
                <Text style={styles.startTime_label}>{'Start time:'}</Text>
                <Text style={styles.startTime}>{stringifyTime_1(startTime)}</Text>
            </View>
            <DropdownComponent
                label="Select Exercise" data={exerciseList}
                selectedItem={exerciseName}
                onSelect={setExerciseName}
                style={styles.dropdown_btn}
                textStyle={styles.dropdown_btn_txt}
                dropdownAllStyles={styles.dropdown_all}
            />
            <View style={styles.G_timeDisplay}>
                <TimeDisplay
                    label='Total time'
                    timerOn={totalTimerOn}
                    extraStyle={{ borderRightWidth: 0.9, borderColor: COLOR.anti }}
                    setTime={setTotalTime}
                    initialTime={deTotalTime}
                    checkedState={[hideTotalTime, setHideTotalTime]}
                    precision={timerPrecision}
                />
                <TimeDisplay
                    label='Work time'
                    timerOn={workTimerOn}
                    setTime={setWorkTime}
                    initialTime={deWorkTime}
                    checkedState={[hideWorkTime, setHideWorkTime]}
                    precision={timerPrecision}
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
                placeholderTextColor={COLOR.antiMinus}
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
                placeholderTextColor={COLOR.antiMinus}
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
                    setTotalTime={time => { setDeTotalTime(time); setTotalTime(time) }}
                    workTime={workTime}
                    setWorkTime={time => { setDeWorkTime(time); setWorkTime(time) }}
                />
            }
            <View style={styles.G_action}>
                <TouchableOpacity style={styles.action_btn} onPress={onRequestTaskCancel}>
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
        </ScrollView>
    );
}

export default RunScreen;