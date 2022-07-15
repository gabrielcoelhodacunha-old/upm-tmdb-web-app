import axios from 'axios';
import { TMDB_API } from 'common/constants/urls';

const api = axios.create({
	baseURL: TMDB_API,
});

export default api;
