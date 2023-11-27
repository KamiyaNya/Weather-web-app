import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ru';

dayjs.extend(utc);
dayjs.extend(timezone);
const date = dayjs().format();

export const fetchWeatherData = createAsyncThunk('temp/fetchTempByCoords', async ({ lat, lon }, thunkApi) => {
	const { data } = await axios.get(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=TGGLQ8KWQT4B7FJYHKRCKBXDG&include=current,day,hours`
	);

	return data;
});

const WeatherSlice = createSlice({
	name: 'wetaher',
	initialState: {
		weather: null,
		weatherDays: null,
		currentDayHourlyWeather: null,
		currentTime: date,
		isLoadingWeather: false,
		timezoneStore: 'Europe/Moscow',
	},
	reducers: {
		setCurrentTimeByTimezone(state, action) {
			state.currentTime = dayjs.tz(action.payload).format();
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
			state.weather = action.payload.currentConditions;
			state.timezoneStore = action.payload.timezone;
			state.currentTime = dayjs().tz(action.payload.timezone).format();
			state.weatherDays = action.payload.days.slice(1, 6);
			let hourlyForecast = action.payload.days[0].hours
				.filter((hour, i) => {
					if (hour.datetimeEpoch > Date.now() / 1000 && i % 2 === 0) {
						return hour;
					}
				})
				.slice(0, 5);

			if (!hourlyForecast.length) {
				const nextDayHourlyForecast = action.payload.days[1].hours
					.filter((hour, i) => {
						if (i % 2 === 0) {
							return hour;
						}
					})
					.slice(0, 5);
				hourlyForecast = [...hourlyForecast, ...nextDayHourlyForecast];
			}
			if (hourlyForecast.length < 5) {
				if (
					hourlyForecast.length &&
					Number(
						dayjs
							.unix(hourlyForecast[hourlyForecast.length - 1].datetimeEpoch)
							.tz(state.timezoneStore)
							.format('HH')
					) === 22
				) {
					hourlyForecast.push(action.payload.days[0].hours[0]);
				}

				const nextDayHourlyForecast = action.payload.days[1].hours
					.filter((hour, i) => {
						if (Number(dayjs.unix(hour.datetimeEpoch).format('HH')) > 0 && i % 2 === 0) {
							return hour;
						}
					})
					.slice(1, 6 - hourlyForecast.length);
				hourlyForecast = [...hourlyForecast, ...nextDayHourlyForecast];
			}
			state.currentDayHourlyWeather = hourlyForecast;
			state.isLoadingWeather = false;
		});
		builder.addCase(fetchWeatherData.pending, (state) => {
			state.isLoadingWeather = true;
		});
		builder.addCase(fetchWeatherData.rejected, (state) => {
			state.isLoadingWeather = false;
		});
	},
});

export const { setCurrentTimeByTimezone } = WeatherSlice.actions;

export default WeatherSlice.reducer;
