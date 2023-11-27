import { Box, Image } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { weatherIcons } from '../../utils/weatherIcons';
import { fahrenheitToCelsius } from '../../utils/celciusConverter';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ArrowBigUp } from 'lucide-react';

export default function HourlyForecastItem({ hourWeather }) {
	const { timezoneStore } = useSelector((state) => state.weather);
	const isNightRange =
		Number(dayjs.unix(hourWeather.datetimeEpoch).tz(timezoneStore).format('HH')) <= 4 || Number(dayjs.unix(hourWeather.datetimeEpoch).tz(timezoneStore).format('HH')) >= 18;

	return (
		<Box
			className={`${isNightRange ? 'night-box' : 'day-box'}`}
			borderRadius='40px'
			py='15px'
			px='20px'
			display={{ base: 'flex', md: 'block' }}
			alignItems='center'>
			<Box
				textAlign='center'
				fontWeight={500}
				fontSize={{ base: '18px', md: '24px' }}>
				{dayjs.unix(hourWeather.datetimeEpoch).tz(timezoneStore).format('HH:mm')}
			</Box>
			<Image
				src={weatherIcons[hourWeather.icon].image}
				alt={weatherIcons[hourWeather.icon].nameRu}
				boxSize={{ base: '50px', md: '80px' }}
				mx='auto'
				mt={{ md: '10px' }}
			/>
			<Box
				fontWeight={500}
				fontSize='22px'
				textAlign='center'
				mt={{ md: '4px' }}>
				{fahrenheitToCelsius(hourWeather.temp)}&#8451;
			</Box>
			<Box
				transform={`rotate(${hourWeather.winddir}deg)`}
				mx='auto'
				mt={{ md: '12px' }}
				width={50}>
				<ArrowBigUp
					size={50}
					strokeWidth={1}
				/>
			</Box>

			<Box
				fontWeight={500}
				fontSize={{ base: '16px', md: '20px' }}
				textAlign='center'
				mt={{ md: '4px' }}>
				{hourWeather.windspeed} м/с
			</Box>
		</Box>
	);
}
