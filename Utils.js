const createNewTask = (exercise_name, start_time) => {
    const d = new Date()
    const st = d.getHours() * 60 + d.getMinutes()
    return {
        exercise_name: exercise_name,
        start_time: st,//start_time,
        total_time: 0,
        work_time: 0,
        show_total_time: true,
        show_work_time: true,
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

export { createNewTask, GoalType, createNewGoal }