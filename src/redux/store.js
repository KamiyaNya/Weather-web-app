import { configureStore, combineReducers } from '@reduxjs/toolkit';

import CoordsSlice from './slices/coords.slice';
import weatherSlice from './slices/weather.slice';

const reducers = combineReducers({
	coords: CoordsSlice,
	weather: weatherSlice,
});

export const store = configureStore({ reducer: reducers });
