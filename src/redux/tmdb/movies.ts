import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchMovie as _searchMovie } from 'services/tmdb';
import { TObject } from 'common/types';

export const searchMovie = createAsyncThunk(
	'tmdb/searchMovie',
	async ({ query, page }: TObject) => await _searchMovie(query, page)
);
