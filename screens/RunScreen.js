import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox"; //https://github.com/WrathChaos/react-native-bouncy-checkbox
import ModalDropdown from "../components/ModalDropdown";


function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1); // update state to force render

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    exercise_label: {
        fontSize: 16,
        marginBottom: -6
    },
    time_display: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        marginVertical: 10,
        paddingVertical: 8
    }
});

const RunScreen = () => {
    const forceUpdate = useForceUpdate();

    const [selected, setSelected] = useState("");


    const data = [
        'Walk', 'Run', 'Pushups', 'Pullups', 'Squats', 'Jumping Jacks', 'Item 7', 'Item 8'
    ];
    return (
        <View style={styles.container}>
            <Text style={styles.exercise_label}>{'Exercise'}</Text>
            <ModalDropdown
                options={data}
                style={{ marginBottom: 10 }}
                textStyle={{ fontSize: 32 }}
                isFullWidth
                dropdownStyle={{ padding: 4, margin: 0 }}
                dropdownTextStyle={{ fontSize: 14 }}
            //showSearch
            />
            <View style={styles.time_display}>
                <View style={{
                    flex: 1,
                    borderRightWidth: 1,
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