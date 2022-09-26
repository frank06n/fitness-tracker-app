import React, { useRef, useState } from 'react';
import { View, FlatList, Modal, StyleSheet, Text, TouchableOpacity, Image, TextInput } from 'react-native';
// https://blog.logrocket.com/creating-custom-react-native-dropdown/

const Dropdown = ({ label, data, onSelect }) => {

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);

    const [dropdownTop, setDropdownTop] = useState(0);
    const DropdownButton = useRef();

    const toggleDropdown = () => visible ? setVisible(false) : openDropdown();

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h - 36.33);
        });
        setVisible(true);
    };

    const [searchTerm, setSearchTerm] = useState('');

    const displayData = data.filter((item) => item.label.toLowerCase().startsWith(searchTerm.toLowerCase()));

    const renderItem = ({ index, item }) => {
        const mstyle = displayData.length == index + 1 ? [styles.item, { borderBottomWidth: 0 }] : styles.item;

        return <TouchableOpacity style={mstyle}
            onPress={() => onItemPress(item)}
        >
            <Text>{item.label}</Text>
        </TouchableOpacity>
    };

    const onItemPress = (item) => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };



    const renderDropdown = () => {
        return (
            <Modal visible={visible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={[styles.dropdown, { top: dropdownTop }]}>
                        <TextInput
                            style={styles.search}
                            placeholder="Search 'xyz' here"
                            value={searchTerm}
                            onChangeText={(text) => {
                                setSearchTerm(text);
                            }}
                        />
                        <FlatList
                            data={displayData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return <TouchableOpacity
        ref={DropdownButton}
        style={styles.button}
        onPress={toggleDropdown}
    >
        {renderDropdown()}
        <Text style={styles.buttonText}>{selected ? selected.label : label}</Text>
        <Image style={{ width: 20, height: 20 }} source={{ uri: 'https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png' }} />
    </TouchableOpacity >;
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddf',
        height: 50,
        width: '90%',
        paddingHorizontal: 10,
        zIndex: 1,
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
    },
    overlay: {
        width: '100%', height: '100%', alignItems: 'center'
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: 324,
        maxHeight: 200,
        paddingHorizontal: 12,
        borderWidth: 0.8, borderColor: '#ddd',
        borderRadius: 3,
    },
    search: {
        paddingVertical: 4, paddingHorizontal: 8,
        marginTop: 10, marginBottom: 2,
        borderWidth: 0.8, borderColor: '#ddd',
        borderRadius: 3,
    },
    item: {
        paddingHorizontal: 4,
        paddingVertical: 10,
        borderBottomWidth: 0.8, borderColor: '#ccc'
    },
});

export default Dropdown;