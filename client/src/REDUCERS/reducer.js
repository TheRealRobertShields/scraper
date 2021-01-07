// eslint-disable-next-line
export default (games = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_GAMES':
            return action.payload;
        default:
            return games;
    }
}

