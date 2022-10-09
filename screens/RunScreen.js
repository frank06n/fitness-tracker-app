import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Button, Alert } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox"; //https://github.com/WrathChaos/react-native-bouncy-checkbox
import DropdownComponent from "../components/Dropdown";
import StopWatch from "../components/StopWatch";
import { formatTime12hf, getCurrentTimeMins, repcountFormat } from "../Utils";

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
    },
    time_btn_ic: {
        width: 30, height: 30, elevation: 3
    },
    reps_input: {
        backgroundColor: '#fff',
        borderRadius: 6,
        elevation: 2,
        paddingHorizontal: 8, paddingVertical: 4,
        marginTop: 10
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
    }
});

const TimeDisplay = ({ label, timerOn, extraStyle, setTime, checkedState }) => {
    const [hideChecked, setHideChecked] = checkedState;
    const _styles = StyleSheet.create({
        container: {
            flex: 1, paddingHorizontal: 10
        },
        checkBox: {
            paddingHorizontal: 10, paddingVertical: 6,
            alignSelf: 'stretch',
            borderRadius: 4, borderWidth: 0.5, borderColor: '#555',
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
        />
    </View>;
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

const RunScreen = ({ navigation }) => {
    const [totalTimerOn, setTotalTimerOn] = useState(false);
    const [workTimerOn, setWorkTimerOn] = useState(false);
    const repcountInput = useRef(null);
    const notesInput = useRef(null);

    const [exerciseName, setExername] = useState(undefined);
    const [startTime, _setStartTime] = useState(getCurrentTimeMins());
    const [totalTime, setTotalTime] = useState(0);
    const [workTime, setWorkTime] = useState(0);
    const [hideTotalTime, setHideTotalTime] = useState(false);
    const [hideWorkTime, setHideWorkTime] = useState(false);
    const [repcount, setRepcount] = useState('');
    const [notes, setNotes] = useState('');

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

        const strip = time => Math.round(time / 100) / 10
        const mItem = {
            exercise_name: exerciseName,
            start_time: startTime,
            total_time: strip(totalTime),
            work_time: strip(workTime),
            hide_total_time: hideTotalTime,
            hide_work_time: hideWorkTime,
            rep_count: repcountFormat(repcount),
            notes: notes
        };
        navigation.navigate('Home', { taskItem: mItem });
    }

    return (
        <View style={styles.container}>
            <View style={styles.G_startTime}>
                <Text style={styles.startTime_label}>{'Start time:'}</Text>
                <Text style={styles.startTime}>{formatTime12hf(startTime)}</Text>
            </View>
            <DropdownComponent
                label="Select Exercise" data={exerciseList} onSelect={(item) => { setExername(item.label) }}
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
                    checkedState={[hideTotalTime, setHideTotalTime]}
                />
                <TimeDisplay
                    label='Work time'
                    timerOn={workTimerOn}
                    setTime={setWorkTime}
                    checkedState={[hideWorkTime, setHideWorkTime]}
                />
            </View>
            <TouchableOpacity style={styles.time_btn} onPress={() => {
                if (!totalTimerOn) setTotalTimerOn(true);
                setWorkTimerOn(!workTimerOn);
            }}>
                <Image style={styles.time_btn_ic} source={workTimerOn ? ic_pause_src : ic_play_src} />
            </TouchableOpacity>
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