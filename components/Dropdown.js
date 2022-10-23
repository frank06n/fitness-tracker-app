import React, { useRef, useState } from 'react';
import { View, FlatList, Modal, StyleSheet, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { COLOR } from '../Utils';
// https://blog.logrocket.com/creating-custom-react-native-dropdown/

// dropdownAllStyles = { style, overlayStyle, searchStyle, itemStyle, itemTextStyle }


const DDSearch = ({ customStyle, placeholder, searchTerm, setSearchTerm }) => {
    return <TextInput
        style={[styles.search, customStyle]}
        placeholder={placeholder}
        placeholderTextColor={customStyle && customStyle.placeholderTextColor}
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
        <Text style={customTextStyle}>{item}</Text>
    </TouchableOpacity>
};

const Dropdown = ({ onRequestClose, data, onSelect, allStyles }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const displayData = data.filter((item) => item.toLowerCase().startsWith(searchTerm.toLowerCase()));
    const { style, overlayStyle, searchStyle, itemStyle, itemTextStyle } = allStyles;

    return (
        <Modal visible={true} transparent animationType="fade" onRequestClose={onRequestClose}>
            <TouchableOpacity
                style={[styles.overlay, overlayStyle]}
                onPress={onRequestClose}
            >
                <View style={[styles.dropdown, style]}>
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
        selectedItem,
        onSelect,
        icon,
        style,
        textStyle,
        dropdownAllStyles
    } = props;

    const [visible, setVisible] = useState(false);

    const [ddTop, set_ddTop] = useState(0);
    const [ddWidth, set_ddWidth] = useState('100%');
    const Self = useRef();

    const toggleDropdown = () => visible ? setVisible(false) : openDropdown();

    const openDropdown = () => {
        Self.current.measure((_fx, _fy, w, h, _px, py) => {
            set_ddTop(py + h);
            set_ddWidth(w);
        });
        setVisible(true);
    };

    const d_allStyles = { ...dropdownAllStyles };
    d_allStyles.style = [{ top: ddTop, width: ddWidth }, d_allStyles.style];

    return <TouchableOpacity
        ref={Self}
        style={[styles.button, style]}
        onPress={toggleDropdown}
    >
        {
            visible &&
            <Dropdown
                onRequestClose={toggleDropdown}
                data={data}
                onSelect={(item) => {
                    onSelect(item);
                    setVisible(false);
                }}
                allStyles={d_allStyles}
            />
        }
        <Text style={[styles.buttonText, textStyle]}>{selectedItem || label}</Text>
        {
            icon ? icon :
                <Image style={{ width: 20, height: 20, tintColor: COLOR.anti }} source={{ uri: 'https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png' }} />
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