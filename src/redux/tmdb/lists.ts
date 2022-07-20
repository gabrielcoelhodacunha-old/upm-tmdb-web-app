import { createAsyncThunk } from '@reduxjs/toolkit';
import { TObject } from 'common/types';
import * as tmdb from 'services/tmdb';

export const getLists = createAsyncThunk(
	'tmdb/getLists',
	async () => await tmdb.getLists()
);

export const createList = createAsyncThunk(
	'tmdb/createList',
	async ({ name, description }: TObject) =>
		await tmdb.createList(name, description)
);

export const deleteList = createAsyncThunk(
	'tmdb/deleteList',
	async ({ id }: TObject) => await tmdb.deleteList(id)
);

export const addMovieToList = createAsyncThunk(
	'tmdb/addMovieToList',
	async ({ movieId, listId }: TObject) =>
		await tmdb.addMovieToList(movieId, listId)
);

export const removeMovieFromList = createAsyncThunk(
	'tmdb/removeMovieFromList',
	async ({ movieId, listId }: TObject) =>
		await tmdb.removeMovieFromList(movieId, listId)
);
