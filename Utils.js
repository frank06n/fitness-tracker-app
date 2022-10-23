import AsyncStorage from "@react-native-async-storage/async-storage";
import dateFormat from "dateformat";

/*
* DateTime formats:
* startTime	    h:MM tt		9:15 pm      -> total minutes
* work/total	M:ss.l		5:32.6       -> total millis
* date          dd-mmm-yy	12-mar-22    -> string
*/

const parseDate = str => new Date(str)
const stringifyDate = dateObj => dateFormat(dateObj, 'dd-mmm-yy')
const parseTime_1 = str => {
    const d = new Date('1-Jan-1 ' + str);
    return d.getHours() * 60 + d.getMinutes();
}
const stringifyTime_1 = totalMins => {
    const d = new Date();
    d.setHours(totalMins / 60);
    d.setMinutes(totalMins % 60);
    return dateFormat(d, 'h:MM tt');
}
const parseTime_2 = str => {
    const [str0, decis] = str.includes('.') ? str.split('.') : [str, '0'];
    const d = new Date('1-Jan-1 00:' + str0);
    return (d.getMinutes() * 60000) + (d.getSeconds() * 1000) + (decis.substring(0, 1) * 100);
}
const stringifyTime_2 = totalMillis => {
    const d = new Date();
    d.setMilliseconds(totalMillis % 1000);
    d.setSeconds((totalMillis / 1000) % 60);
    d.setMinutes(totalMillis / 60000);
    const ss = dateFormat(d, 'M:ss.l')
    return ss.substring(0, ss.length - 2);
}

const COLOR = {
    primaryDark: '#002029',
    primary: '#034152',
    primaryLight: '#065970',
    anti: '#bbb',
    antiPlus: '#ddd',
    antiMinus: '#888',
}

const createNewTask = (exercise_name, start_time = getCurrentTimeMins()) => {
    return {
        exercise_name: exercise_name,
        start_time: start_time,
        total_time: 0,
        work_time: 0,
        hide_total_time: false,
        hide_work_time: false,
        rep_count: '',
        notes: ''
    };
}

const initExercisesDb = () => {
    AsyncStorage.getItem('@exercises')
        .then(value => {
            value = JSON.parse(value);
            if (value && value.length) return;
            return AsyncStorage.setItem('@exercises', JSON.stringify([
                'Walk', 'Run', 'Jumping Jacks', 'Skipping',
                'Pushups', 'Pullups', 'Squats', 'Lunges',
                'Burpees', 'Situps', 'Crunches', 'Russian Twists', 'Plank',
                'Tricep Extensions', 'Tricep Dips', 'Bicep Curls', 'Benchpress',
                'Hamstring Curls', 'Calf Raises',
            ]));
        });
}

const getCurrentTimeMins = () => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
}


const getRepsFromInput = repc => {
    const reg = /\d+( ?x ?\d+)?/g
    return repc.replace(/ +/g, ' ').match(reg)
}

const repcountFormat = repc => {
    const reps = getRepsFromInput(repc)
    if (!reps || !reps.length) return '';

    let s = '' + reps[0];
    for (let i = 1; i < reps.length; i++) s += ', ' + reps[i];
    return s;
}

export {
    createNewTask, repcountFormat,
    parseDate, parseTime_1, parseTime_2, stringifyDate, stringifyTime_1, stringifyTime_2,
    COLOR, initExercisesDb
}