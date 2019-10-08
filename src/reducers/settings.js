const settingsDefaultState = {
    activity_time: 25,
    rest_time: 5
};

export default (state = settingsDefaultState, action) => {
    switch(action.type) {
        case 'SET_SETTINGS':
            return {
                activity_time: action.activity_time,
                rest_time: action.rest_time
            };
        default:
            return state;
    };
}
