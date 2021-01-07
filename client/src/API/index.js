import axios from 'axios';

const url = 'http://localhost:1000';
export const fetchGames = () => axios.get(url);

const scoresURL = 'http://localhost:1000/scores';
export const fetchScores = () => axios.get(scoresURL);