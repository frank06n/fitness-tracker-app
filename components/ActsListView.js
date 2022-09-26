import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";


const createAct = (act_name, duration, reps='') => {
    return {
        act_name:act_name, duration:duration, reps:reps
    };
};

const timeFormat = (secs) => {
    const m = Math.floor(secs/60);
    const s = secs%60;
    return m+':'+(s<10?'0':'')+s;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,

        marginHorizontal:16,
        marginVertical: 8,

        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 2,
    },
    txt_act_name: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        paddingLeft: 4
    },
    txt_duration: {
        backgroundColor: '#dfdfdf',
        width: 50,
        textAlign: 'center',
        paddingVertical: 2,
        borderRadius: 6,
    },
    txt_reps: {
        marginRight: 6,
        backgroundColor: '#ffdfdf',
        width: 50,
        textAlign: 'center',
        paddingVertical: 2,
        borderRadius: 6,
    },
});


const ActsRow = ({ act }) => {
    const m_act_name = act.item.act_name;
    const m_duration = timeFormat(act.item.duration);
    const m_reps = act.item.reps;

    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    return <View style={styles.container}>
        <Text style={styles.txt_act_name}> {m_act_name} </Text>
        { 
            m_reps=='' ? null :
            <Text style={styles.txt_reps}> {m_reps} </Text>
        }
        <Text style={styles.txt_duration}> {m_duration} </Text>
        <TouchableOpacity style={{marginLeft:4}} onPress={showMenu}>
            <Image
                style={{ width: 15, height: 15, margin:5 }}
                source={{uri:'https://cdn-icons-png.flaticon.com/512/61/61140.png'}}
            />
        </TouchableOpacity>
        <Menu
            visible={visible}
            onRequestClose={hideMenu}
        >
            <MenuItem onPress={hideMenu}>Edit</MenuItem>
            <MenuItem onPress={hideMenu}>Delete</MenuItem>
        </Menu>
    </View>;
};

const ActsListView = ({ data }) => {
    const renderAct = (act) => <ActsRow act={act}/>;

    // return <View style={{flex: 1}}>
    //     <FlatList data={ data } renderItem={renderAct}/>
    // </View>;
    return <FlatList style={{flex:1}} data={data} renderItem={renderAct}/>
};

export {ActsListView, createAct};