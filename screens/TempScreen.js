import { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Dropdown from "../components/Dropdown";



function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1); // update state to force render

}

const TempScreen = ({ }) => {
    const forceUpdate = useForceUpdate();

    const [selected, setSelected] = useState({ label: 'This is label', value: 'fuckk' });

    const data = [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
        { label: 'Four', value: '4' },
        { label: 'Five', value: '5' },
        { label: 'Six', value: '6' },
        { label: 'Seven', value: '7' },
        { label: 'Eight', value: '8' },
        { label: 'Nine', value: '9' },
        { label: 'Ten', value: '10' },
    ];

    return (
        <View style={styles.container} >
            {!!selected && (
                <Text>
                    {'Selected: label= "' + selected.label + '" and value= "' + selected.value + '"'}
                </Text>
            )}
            <Dropdown label="Select Item" data={data} onSelect={setSelected} />
            <Text>This is the rest of the form.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center'
    }
})

export default TempScreen;
