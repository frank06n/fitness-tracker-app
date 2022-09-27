import React, { useRef, useState } from 'react';
import { View, FlatList, Modal, StyleSheet, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
// https://blog.logrocket.com/creating-custom-react-native-dropdown/

const DDSearch = ({ customStyle, placeholder, searchTerm, setSearchTerm }) => {
    return <TextInput
        style={[styles.search, customStyle]}
        placeholder={placeholder}
        value={searchTerm}
        onChangeText={(text) => {
            setSearchTerm(text);
        }}
    />;
}

const DDItem = ({ index, item, displayData, customStyle, customTextStyle, onPress }) => {
    const mstyle = [styles.item];
    if (displayData.length == index + 1) mstyle.push({ borderBottomWidth: 0 });
    if (customStyle) mstyle.push(customStyle);

    return <TouchableOpacity style={mstyle} onPress={() => onPress(item)}>
        <Text style={customTextStyle}>{item.label}</Text>
    </TouchableOpacity>
};

const Dropdown = ({ onPressOutside, data, onSelect, customStyle, overlayStyle, searchStyle, itemStyle, itemTextStyle }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const displayData = data.filter((item) => item.label.toLowerCase().startsWith(searchTerm.toLowerCase()));

    return (
        <Modal visible={true} transparent animationType="fade">
            <TouchableOpacity
                style={[styles.overlay, overlayStyle]}
                onPress={onPressOutside}
            >
                <View style={[styles.dropdown, customStyle]}>
                    <DDSearch
                        placeholder={'Search exercise'}
                        customStyle={searchStyle}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <FlatList
                        data={displayData}
                        renderItem={({ item, index }) => DDItem({
                            item: item,
                            index: index,
                            displayData: displayData,
                            customStyle: itemStyle,
                            customTextStyle: itemTextStyle,
                            onPress: onSelect
                        })}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};


const DropdownComponent = (props) => {
    const {
        label,
        data,
        onSelect,
        icon,
        style,
        textStyle,
        overlayStyle,
        dropdownStyle,
        searchStyle,
        itemStyle,
        itemTextStyle
    } = props;

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);

    const [ddTop, set_ddTop] = useState(0);
    const [ddWidth, set_ddWidth] = useState('100%');
    const Self = useRef();

    const toggleDropdown = () => visible ? setVisible(false) : openDropdown();

    const openDropdown = () => {
        Self.current.measure((_fx, _fy, w, h, _px, py) => {
            set_ddTop(py + h - 36.33);
            set_ddWidth(w);
        });
        setVisible(true);
    };

    return <TouchableOpacity
        ref={Self}
        style={[styles.button, style]}
        onPress={toggleDropdown}
    >
        {
            visible &&
            <Dropdown
                onPressOutside={toggleDropdown}
                data={data}
                onSelect={(item) => {
                    setSelected(item);
                    onSelect(item);
                    setVisible(false);
                }}
                customStyle={[{ top: ddTop, width: ddWidth }, dropdownStyle]}
                overlayStyle={overlayStyle}
                searchStyle={searchStyle}
                itemStyle={itemStyle}
                itemTextStyle={itemTextStyle}
            />
        }
        <Text style={[styles.buttonText, textStyle]}>{selected ? selected.label : label}</Text>
        {
            icon ? icon :
                <Image style={{ width: 20, height: 20 }} source={{ uri: 'https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png' }} />
        }
    </TouchableOpacity >;
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        flex: 1,
    },
    overlay: {
        width: '100%', height: '100%'
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        maxHeight: 200,
        paddingHorizontal: 12,
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

export default DropdownComponent;