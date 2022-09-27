import { useState, useEffect, Component, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Button } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox"; //https://github.com/WrathChaos/react-native-bouncy-checkbox
import DropdownComponent from "../components/Dropdown";
import StopWatch from "../components/StopWatch";


function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1); // update state to force render

}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, },
    grp_start_time: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    start_time_label: { fontSize: 16 },
    start_time_txt: { fontSize: 16 },
    grp_time_display: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
        elevation: 2,
        marginVertical: 10,
        paddingVertical: 12
    },
    timer_button: {
        backgroundColor: '#fff',
        width: 80,
        height: 50,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 2,
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
    grp_action: {
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
    action_btn_text: {
        color: '#f2f2f2', fontSize: 16
    }
});

const TimeDisplay = ({ label, timerOn, extraStyle, onCheck }) => {
    const [hideChecked, setHideChecked] = useState(false);
    return <View
        style={[{ flex: 1, paddingHorizontal: 10, }, extraStyle]}
        opacity={hideChecked ? 0.3 : 1}
    >
        <BouncyCheckbox
            size={20}
            fillColor="black"
            text="Hide"
            style={{ paddingHorizontal: 10, paddingVertical: 6, alignSelf: 'stretch', borderRadius: 4, borderWidth: 0.5, borderColor: '#555', marginBottom: 8 }}
            iconStyle={{ borderColor: '#000' }}
            textStyle={{ color: '#000', fontSize: 18, textAlign: 'center' }}
            onPress={(checked) => {
                setHideChecked(checked);
                if (onCheck) onCheck(checked);
            }}
        />
        <Text style={{ fontSize: 16, paddingLeft: 10 }}>{label}</Text>
        <StopWatch
            start={timerOn}
            style={{ fontSize: 26, paddingLeft: 10 }}
        />
    </View>;
}

const RunScreen = () => {
    const forceUpdate = useForceUpdate();

    const [totalTimerOn, setTotalTimerOn] = useState(false);
    const [workTimerOn, setWorkTimerOn] = useState(false);

    const ic_play_src = { uri: 'https://cdn.icon-icons.com/icons2/2226/PNG/512/play_icon_134504.png' };
    const ic_pause_src = { uri: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png' }

    const data = [
        'Walk', 'Run', 'Jumping Jacks', 'Skipping',
        'Pushups', 'Pullups', 'Squats', 'Lunges',
        'Burpees', 'Situps', 'Crunches', 'Russian Twists',
        'Tricep Extensions', 'Tricep Dips', 'Bicep Curls', 'Benchpress',
        'Hamstring Curls', 'Calf Raises',
    ];
    for (let i = 0; i < data.length; i++) {
        data[i] = { label: data[i], value: i.toString() };
    }

    return (
        <View style={styles.container}>
            <View style={styles.grp_start_time}>
                <Text style={styles.start_time_label}>{'Start time:'}</Text>
                <Text style={styles.start_time}>{'9:32am'}</Text>
            </View>
            <DropdownComponent
                label="Select Exercise" data={data} onSelect={() => { }}
                style={{
                    backgroundColor: '#fff',
                    padding: 12,
                    paddingHorizontal: 20,
                    elevation: 2,
                    borderTopLeftRadius: 6, borderTopRightRadius: 6,
                    marginTop: 10,
                }}
                textStyle={{
                    fontSize: 26,
                    marginTop: -4,
                }}
                overlayStyle={{
                    alignItems: 'center', backgroundColor: '#2222'
                }}
                dropdownStyle={{
                    borderBottomLeftRadius: 6, borderBottomRightRadius: 6,
                    maxHeight: 400
                }}
            />
            <View style={styles.grp_time_display}>
                <TimeDisplay
                    label='Total time'
                    timerOn={totalTimerOn}
                    extraStyle={{ borderRightWidth: 0.9, borderColor: '#888' }}
                />
                <TimeDisplay
                    label='Work time'
                    timerOn={workTimerOn}
                />
            </View>
            <TouchableOpacity style={styles.timer_button} onPress={() => {
                if (!totalTimerOn) setTotalTimerOn(true);
                setWorkTimerOn(!workTimerOn);
            }}>
                <Image style={{ width: 30, height: 30, elevation: 3 }} source={workTimerOn ? ic_pause_src : ic_play_src} />
            </TouchableOpacity>
            <TextInput
                placeholder="Enter your reps (optional)"
                style={styles.reps_input}
            />
            <TextInput
                placeholder="Enter your notes (optional)"
                multiline={true}
                style={styles.notes_input}
            />
            <View style={styles.grp_action}>
                <TouchableOpacity style={styles.action_btn}>
                    <Text style={styles.action_btn_text}>{'CANCEL'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action_btn}>
                    <Text style={styles.action_btn_text}>{'SAVE'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default RunScreen;