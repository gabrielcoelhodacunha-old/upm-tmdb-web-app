import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tmdbReducer from './tmdb';

export const store = configureStore({
	reducer: {
		tmdb: tmdbReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
