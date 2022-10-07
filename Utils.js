const createNewTask = (exercise_name, start_time) => {
    const d = new Date()
    const st = d.getHours() * 60 + d.getMinutes()
    return {
        exercise_name: exercise_name,
        start_time: st,//start_time,
        total_time: 0,
        work_time: 0,
        hide_total_time: false,
        hide_work_time: false,
        rep_count: '3x14',
        notes: 'Aaa asbas this is a note'
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

const getCurrentTime = () => {
    const d = new Date()
    const h = d.getHours();
    const m = d.getMinutes();
    const hm = h * 60 + m;
    return (h > 12 ? h - 12 : h) + ':' + (m < 10 ? '0' : '') + m + (hm >= 720 ? ' pm' : ' am');
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

export { createNewTask, GoalType, createNewGoal, getCurrentTime, repcountFormat }