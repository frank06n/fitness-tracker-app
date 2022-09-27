import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox"; //https://github.com/WrathChaos/react-native-bouncy-checkbox
import DropdownComponent from "../components/Dropdown";


function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1); // update state to force render

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    grp_1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    exercise_label: {
        fontSize: 16
    },
    time_display: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
        elevation: 2,
        marginVertical: 10,
        paddingVertical: 8
    }
});

const RunScreen = () => {
    const forceUpdate = useForceUpdate();


    const data = [
        'Walk', 'Run', 'Jumping Jacks', 'Skipping',
        'Pushups', 'Pullups', 'Squats', 'Lunges',
    ];
    for (let i = 0; i < data.length; i++) {
        data[i] = { label: data[i], value: i.toString() };
    }

    return (
        <View style={styles.container}>
            <View style={styles.grp_1}>
                <Text style={styles.exercise_label}>{'Exercise'}</Text>
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
                }}
            />
            <View style={styles.time_display}>
                <View style={{
                    flex: 1,
                    borderRightWidth: 0.9, borderColor: '#888',
                    paddingHorizontal: 25
                }}>
                    <BouncyCheckbox
                        size={16}
                        fillColor="black"
                        unfillColor="#FFFFFF"
                        text="Hide"
                        style={{ padding: 2 }}
                        iconStyle={{ borderColor: '#000', borderRadius: 6 }}
                        innerIconStyle={{ borderWidth: 1, borderRadius: 6 }}
                        textStyle={{ color: '#000', marginLeft: -6, fontSize: 12 }}
                    //onPress={(isChecked: boolean) => {}}
                    />
                    <Text>{"Total time"}</Text>
                    <Text>{"03:08"}</Text>
                </View>
                <View style={{
                    flex: 1,
                    paddingHorizontal: 25
                }}>
                    <BouncyCheckbox
                        size={16}
                        fillColor="black"
                        unfillColor="#FFFFFF"
                        text="Hide"
                        style={{ padding: 2 }}
                        iconStyle={{ borderColor: '#000', borderRadius: 6 }}
                        innerIconStyle={{ borderWidth: 1, borderRadius: 6 }}
                        textStyle={{ color: '#000', marginLeft: -6, fontSize: 12 }}
                    //onPress={(isChecked: boolean) => {}}
                    />
                    <Text>{"Work time"}</Text>
                    <Text>{"02:40"}</Text>
                </View>
            </View>
            <TouchableOpacity style={{
                backgroundColor: '#fff',
                width: 80,
                height: 50,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: 'center',
                alignSelf: 'center',
                elevation: 3,
            }}>
                <Image style={{ width: 30, height: 30, elevation: 3 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/0/375.png' }} />
            </TouchableOpacity>
            <TextInput
                placeholder="Enter your reps (optional)"
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    elevation: 2,
                    paddingHorizontal: 8, paddingVertical: 4,
                    marginTop: 10
                }}
            />
            <TextInput
                placeholder="Enter your notes (optional)"
                multiline={true}
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    elevation: 2,
                    paddingHorizontal: 8, paddingVertical: 4,
                    marginTop: 10,
                    height: 60,
                    textAlignVertical: 'top'
                }}
            />
            <View style={{
                flexDirection: 'row',
                marginTop: 30,
                justifyContent: 'center'
            }}>
                <TouchableOpacity style={{
                    backgroundColor: '#222',
                    marginRight: 10,
                    width: '30%',
                    padding: 10,
                    borderRadius: 6,
                    alignItems: 'center'
                }}>
                    <Text style={{ color: '#f2f2f2', fontSize: 16 }}>{'CANCEL'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: '#222',
                    marginLeft: 10,
                    width: '30%',
                    padding: 10,
                    borderRadius: 6,
                    alignItems: 'center'
                }}>
                    <Text style={{ color: '#f2f2f2', fontSize: 16 }}>{'SAVE'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default RunScreen;