import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';

const BtnGrp_btn = (ix, text, onPress, onValueAsked) => <TouchableOpacity
    key={ix}
    style={styles.btnGrp_btn}
    onPress={() => onPress(onValueAsked())}
>
    <Text style={styles.btnGrp_btn_txt}>{text}</Text>
</TouchableOpacity>;

const BtnGrp = ({ buttons, onValueAsked }) => {
    if (!buttons) return;

    return <View style={styles.btnGrp}>
        {buttons.map((b, i) => BtnGrp_btn(i, b.text, b.onPress, onValueAsked))}
    </View>;
}

const Prompt = ({ title = 'Prompt', message, defaultValue, placeholder, buttons, onPressOutside, visible = false }) => {
    const [value, setValue] = useState();
    const onValueAsked = _ => value;
    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableOpacity
                style={styles.overlay}
                onPress={onPressOutside}
            >
                <View style={styles.dialog}>
                    <Text style={styles.title}>{title}</Text>
                    {
                        !!message &&
                        <Text style={styles.message}>{message}</Text>
                    }
                    <TextInput
                        style={styles.prompt}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        onChangeText={text => setValue(text)} />
                    <BtnGrp buttons={buttons} onValueAsked={onValueAsked} />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        width: '100%', height: '100%',
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#00000033'
    },
    dialog: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        width: '90%',
        borderRadius: 6,
        paddingVertical: 12,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    message: {
        marginBottom: 8,
    },
    prompt: {
        backgroundColor: '#f0f0f0',
        borderRadius: 6,
        borderColor: '#999', borderWidth: 0.8,
        paddingHorizontal: 8,
    },
    btnGrp: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    btnGrp_btn: {
        padding: 2, paddingHorizontal: 10,
        marginTop: 8,
        marginLeft: 8,
    },
    btnGrp_btn_txt: {
        fontWeight: 'bold',
        fontSize: 18,
    },

});

export default Prompt;

/**  //// SAMPLE USAGE ////
 
const [promptData, setPromptData] = useState({});
 
<AnyParent>
    <Prompt {...promptData} onPressOutside={() => setPromptData({})} />
</AnyParent>
 
-------------------------------------------
// to show
setPromptData({
    visible: true,
    title: 'sample title',
    message: 'sample message',
    placeholder: 'enter data here',
    defaultValue: 'default data',
    buttons: [
        { text: 'OK', onPress: val => { someTask_withValue(val); setPromptData({}) } },
        { text: 'Cancel', onPress: _ => setPromptData({}) },
    ]
});

 */