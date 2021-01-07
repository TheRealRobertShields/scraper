// eslint-disable-next-line
export default (scores = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_SCORES':
            return action.payload;
        default:
            return scores;
    }
}