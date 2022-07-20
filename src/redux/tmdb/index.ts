import { createSlice } from '@reduxjs/toolkit';
import { TList, TMovie } from 'common/types';
import { RootState } from '../store';
import * as moviesActions from './movies';
import * as listsActions from './lists';

export const tmdbSlice = createSlice({
	name: 'tmdb',
	initialState: {
		movies: [],
		lists: [],
		status: 'idle',
	} as TMDBState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				searchMovie.pending ||
					getLists.pending ||
					createList.pending ||
					deleteList.pending ||
					addMovieToList.pending ||
					removeMovieFromList.rejected,
				(state) => {
					state.status = 'loading';
				}
			)
			.addCase(
				searchMovie.rejected ||
					getLists.rejected ||
					createList.rejected ||
					deleteList.rejected ||
					addMovieToList.rejected ||
					removeMovieFromList.rejected,
				(state) => {
					state.status = 'failed';
				}
			)
			.addCase(searchMovie.fulfilled, (state, action) => {
				state.status = 'idle';
				state.movies = action.payload;
			})
			.addCase(getLists.fulfilled, (state, action) => {
				state.status = 'idle';
				state.lists = action.payload;
			})
			.addCase(
				addMovieToList.fulfilled || removeMovieFromList.fulfilled,
				(state) => {
					state.status = 'idle';
				}
			);
	},
});

export const selectMovies = (state: RootState) => state.tmdb.movies;
export const selectLists = (state: RootState) => state.tmdb.lists;

export interface TMDBState {
	movies: TMovie[];
	lists: TList[];
	status: 'idle' | 'loading' | 'failed';
}

export const { searchMovie } = moviesActions;
export const {
	getLists,
	createList,
	deleteList,
	addMovieToList,
	removeMovieFromList,
} = listsActions;

export default tmdbSlice.reducer;
