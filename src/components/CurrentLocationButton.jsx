import { Button, Image } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { fetchCityByCoords, setCurrentLocation } from '../redux/slices/coords.slice';
import { fetchWeatherData } from '../redux/slices/weather.slice';

export default function CurrentLocationButton() {
	const dispatch = useDispatch();

	const successLocation = (position) => {
		const coords = position.coords;
		dispatch(setCurrentLocation({ lat: coords.latitude, lon: coords.longitude }));
		dispatch(fetchWeatherData({ lat: coords.latitude, lon: coords.longitude }));
		dispatch(fetchCityByCoords({ lat: coords.latitude, lon: coords.longitude }));
	};

	const errorLocation = (err) => {
		alert(`Ошибка(${err.code}): ${err.message}`);
	};

	const getCoords = () => {
		navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
	};
	return (
		<Button
			color='white'
			bgColor='#4CBB17'
			borderRadius='50px'
			px='10px'
			py='4px'
			fontSize={{ base: 0, lg: 16 }}
			_hover={{ bgColor: 'green' }}
			onClick={getCoords}>
			<Image
				src='/current_location_icon.png'
				alt='Текущее местоположение'
				boxSize={35}
				mr={{ xl: '10px' }}
			/>
			Текущее местоположение
		</Button>
	);
}
