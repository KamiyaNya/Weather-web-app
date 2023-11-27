import { Box, Heading, Skeleton, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import DayForecastItem from './5DayForecast/DayForecastItem';

export default function FiveDayForecast() {
	const { weatherDays, isLoadingWeather } = useSelector((state) => state.weather);
	const bg = useColorModeValue('#d9d9d9', '#444');
	return (
		<Box
			className='box'
			minWidth={{ lg: '400px', x1440: '500px' }}
			bgColor={bg}
			height='100%'>
			<Heading
				as='h2'
				textAlign='center'>
				Прогноз на 5 дней:
			</Heading>
			<Box mt='4px'>
				{!isLoadingWeather && weatherDays
					? weatherDays.map((day) => (
							<DayForecastItem
								key={day.datetime}
								data={day}
							/>
					  ))
					: [...Array(5)].map((_, i) => (
							<Skeleton
								mt='2px'
								key={i + 1}
								h='60px'
							/>
					  ))}
			</Box>
		</Box>
	);
}
