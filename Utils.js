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

// const COLOR = {
//     primary: '#2a2a2a',
//     primaryLight: '#404040',
//     primaryDark: '#171717',
//     anti: '#bbb',
//     antiPlus: '#ddd',
//     antiMinus: '#888',
// };
const COLOR = {
    primaryDark: '#002029',
    primary: '#00303d',
    primaryLight: '#004052',
    anti: '#bbb',
    antiPlus: '#ddd',
    antiMinus: '#888',
};
// const COLOR = {
//     primaryDark: '#e0e0e0',
//     primary: '#fff',
//     primaryLight: '#f0f0f0',
//     anti: '#3d3d3d',
//     antiPlus: '#000',
//     antiMinus: '#666',
// };
// const COLOR = {
//     primaryDark: '#bdf',
//     primary: '#eef6ff',
//     primaryLight: '#fff',
//     anti: '#045',
//     antiPlus: '#012',
//     antiMinus: '#357',
// };


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

const setTestDb = () => {
    const d = new Date()
    const exercises = [
        'Walk', 'Run', 'Jumping Jacks', 'Skipping',
        'Pushups', 'Pullups', 'Squats', 'Lunges',
        'Burpees', 'Situps', 'Crunches', 'Russian Twists', 'Plank',
        'Tricep Extensions', 'Tricep Dips', 'Bicep Curls', 'Benchpress',
        'Hamstring Curls', 'Calf Raises',
    ];
    const history = [];
    const lists = {};
    const rd = (a, b) => Math.floor(Math.random() * b - a + 1) + a;
    for (let i = 0; i < 12; i++) {
        const date = stringifyDate(new Date(d.getTime() - (i + 1) * 86400 * 1000));
        const tasks = [];
        for (let j = 0; j < rd(10, 15); j++) {
            const task = createNewTask();
            task.exercise_name = exercises[rd(0, 18)];
            task.hide_total_time = rd(0, 3) == 1;
            task.hide_work_time = rd(0, 6) == 1;
            task.rep_count = ['5x12', '10, 12, 15', '4x6, 5, 3'][rd(0, 2)];
            task.start_time = rd(10, 1430);
            task.total_time = rd(20, 600) * 1000;
            task.work_time = Math.round(task.total_time * (1 - Math.random() * 0.2));
            task.notes = ['Notes: ; 1', 'Notes it is 2', 'this is NOTES 3', 'notes the 4'][rd(0, 3)];
            tasks.push(task);
        }

        history.push(date);
        lists[date] = tasks;
    }
    AsyncStorage.setItem('@history', JSON.stringify(history))
        .then(() => console.log('history saved to db'));
    for (let date of history) {
        AsyncStorage.setItem('@listOf_' + date, JSON.stringify(lists[date]))
            .then(() => console.log(date + ' tasks saved to db'));
    }
}

const consoleLogDb = () => {
    AsyncStorage.getItem('@history')
        .then(value => {
            const hist = JSON.parse(value);
            for (let i = 0; i < 3; i++) {
                AsyncStorage.getItem('@listOf_' + hist[i])
                    .then(value => console.log(hist[i] + ' tasks: ', JSON.parse(value)));
            }
        });
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


// const GoalType = Object.freeze({
//     REPS: Symbol(0),
//     MAX_REPS: Symbol(1),
//     TIME: Symbol(2),
//     MAX_TIME: Symbol(3)
// });

// const createNewGoal = (exercise_name) => {
//     return {
//         exercise_name: exercise_name,
//         goal_type: null,
//         goal_value: 0,
//         calc_progress_value: 0
//     };
// };

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
    consoleLogDb, setTestDb, COLOR, initExercisesDb
}