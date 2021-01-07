import * as api from '../API';

export const getGames = () => async (dispatch) => {
    const { data } = await api.fetchGames();
    dispatch({ type: 'FETCH_ALL_GAMES', payload: data});
}


export const getScores = () => async (dispatch) => {
    const { data } = await api.fetchScores();
    dispatch({ type: 'FETCH_ALL_SCORES', payload: data});
}