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
    const [str0, decis] = str.split('.');
    const d = new Date('1-Jan-1 00:' + str0);
    return (d.getMinutes() * 60000) + (d.getSeconds() * 1000) + (decis * 100);
}
const stringifyTime_2 = totalMillis => {
    const d = new Date();
    d.setMilliseconds(totalMillis % 1000);
    d.setSeconds((totalMillis / 1000) % 60);
    d.setMinutes(totalMillis / 60000);
    const ss = dateFormat(d, 'M:ss.l')
    return ss.substring(0, ss.length - 2);
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

const GoalType = Object.freeze({
    REPS: Symbol(0),
    MAX_REPS: Symbol(1),
    TIME: Symbol(2),
    MAX_TIME: Symbol(3)
});

const createNewGoal = (exercise_name) => {
    return {
        exercise_name: exercise_name,
        goal_type: null,
        goal_value: 0,
        calc_progress_value: 0
    };
};

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
    createNewTask, GoalType, createNewGoal, repcountFormat,
    parseDate, parseTime_1, parseTime_2, stringifyDate, stringifyTime_1, stringifyTime_2
}