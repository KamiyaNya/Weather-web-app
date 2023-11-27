import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	coords: { lat: 55.45, lon: 37.36 },
	city: 'Москва',
	isLoadingCity: false,
};

export const fetchCityByCoords = createAsyncThunk('coords/fetchCityByCoords', async ({ lat, lon }) => {
	const { data } = await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=a547952b-76d0-4433-abed-c8d70389138a&geocode=${lon},${lat}&format=json`, { headers: null });
	return data?.response.GeoObjectCollection.featureMember[0].GeoObject.description.split(',')[0];
});

export const fetchCoordsByCity = createAsyncThunk('coords/fetchCoordsByCity', async ({ city }, thunkApi) => {
	const { data } = await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=a547952b-76d0-4433-abed-c8d70389138a&geocode=${city.trim()}&format=json`, { headers: null });
	if (data.statusCode === 404) {
		return false;
	} else {
		return data?.response.GeoObjectCollection.featureMember.filter((geo) => {
			return geo.GeoObject.name.trim() === city.trim();
		})[0].GeoObject;
	}
});

export const coordsSlice = createSlice({
	name: 'coords',
	initialState,
	reducers: {
		setCurrentLocation(state, action) {
			state.coords = action.payload;
		},
		setCurrentCity(state, action) {
			state.city = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCityByCoords.fulfilled, (state, action) => {
			state.city = action.payload;
			state.isLoadingCity = false;
		});
		builder.addCase(fetchCityByCoords.pending, (state) => {
			state.isLoadingCity = true;
		});
		builder.addCase(fetchCityByCoords.rejected, (state) => {
			state.isLoadingCity = false;
		});
		builder.addCase(fetchCoordsByCity.fulfilled, (state, action) => {
			if (!action.payload) return;
			const payloadCoords = action.payload.Point.pos;
			state.coords = { lat: payloadCoords.split(' ')[1], lon: payloadCoords.split(' ')[0] };
			state.city = action.payload.name;
			state.isLoadingCity = false;
		});
		builder.addCase(fetchCoordsByCity.pending, (state) => {
			state.isLoadingCity = true;
		});
		builder.addCase(fetchCoordsByCity.rejected, (state) => {
			state.isLoadingCity = false;
		});
	},
});

export const { setCurrentLocation, setCurrentCity } = coordsSlice.actions;

export default coordsSlice.reducer;
