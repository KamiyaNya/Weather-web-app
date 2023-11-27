import { Box, Heading, Skeleton, Grid, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import HourlyForecastItem from './hourlyForecast/HourlyForecastItem';

export default function HourlyForecast() {
	const { isLoadingWeather, currentDayHourlyWeather } = useSelector((state) => state.weather);
	const bg = useColorModeValue('#d9d9d9', '#444');
	return (
		<Box
			className='box'
			width='100%'
			bgColor={bg}
			height='100%'>
			<Heading
				as='h2'
				textAlign='center'>
				Прогноз сегодня
			</Heading>
			<Grid
				gridTemplateColumns={{ md: 'repeat(5,1fr)' }}
				gap='15px'
				mt='20px'>
				{!isLoadingWeather && currentDayHourlyWeather
					? currentDayHourlyWeather.map((hour) => (
							<HourlyForecastItem
								key={hour.datetime}
								hourWeather={hour}
							/>
					  ))
					: [...Array(5)].map((_, i) => (
							<Skeleton
								key={i + 1}
								height='150px'
								width='100%'
							/>
					  ))}
			</Grid>
		</Box>
	);
}
