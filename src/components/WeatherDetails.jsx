import { useEffect } from 'react';
import { Box, Flex, Skeleton, Image, Heading, Grid, useColorModeValue } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from './../redux/slices/weather.slice';
import WeatherDetailsStat from './weatherDetails/weatherDetailsStat';
import { weatherIcons } from '../utils/weatherIcons';
import { fahrenheitToCelsius } from '../utils/celciusConverter';
import { Sunrise, Sunset } from 'lucide-react';

export default function WeatherDetails() {
	const { coords } = useSelector((state) => state.coords);
	const { weather, isLoadingWeather } = useSelector((state) => state.weather);
	const bg = useColorModeValue('#d9d9d9', '#444');
	const textColor = useColorModeValue('#515151', '#d9d9d9');
	const dispatch = useDispatch();

	const getTemp = async (lat, lon) => {
		dispatch(fetchWeatherData({ lat, lon }));
	};

	useEffect(() => {
		getTemp(coords.lat, coords.lon);
	}, []);

	return (
		<Grid
			className='box'
			width='100%'
			bgColor={bg}
			height='100%'
			gap='20px'
			gridTemplateColumns={{ sm: '1fr 2.5fr 1.8fr', x1440: '1fr 3fr 2fr' }}>
			<Flex
				flexDirection={{ base: 'row', sm: 'column' }}
				justifyContent={{ base: 'space-between', sm: 'normal' }}>
				<Box>
					<Box
						fontSize='64px'
						lineHeight='1.2'
						fontWeight='bold'>
						{!isLoadingWeather && weather ? (
							fahrenheitToCelsius(weather.temp)
						) : (
							<Skeleton
								h='76px'
								w='90px'
								display='inline-flex'
							/>
						)}
						°C
					</Box>
					<Flex
						color={textColor}
						alignItems='center'
						fontWeight='medium'
						fontSize='18px'
						lineHeight='1.2'>
						Ощущается:
						<Box
							fontSize='20px'
							lineHeight='1.2'
							ml='3px'>
							{!isLoadingWeather && weather ? (
								fahrenheitToCelsius(weather.feelslike)
							) : (
								<Skeleton
									h='24px'
									w='24px'
									display='inline-flex'
								/>
							)}
							°C
						</Box>
					</Flex>
				</Box>
				<Flex
					flexDirection='column'
					gap='20px'
					mt={{ sm: '40px' }}>
					<Flex
						alignItems='center'
						gap='10px'>
						<Box>
							<Sunrise
								size={50}
								strokeWidth={1}
							/>
						</Box>
						<Box>
							<Box
								fontSize='20px'
								fontWeight='bold'>
								Восход
							</Box>
							<Box
								fontWeight='medium'
								fontSize='18px'>
								{!isLoadingWeather && weather ? `${weather.sunrise.split(':')[0]}:${weather.sunrise.split(':')[1]}` : <Skeleton h='20px' />}
							</Box>
						</Box>
					</Flex>
					<Flex
						alignItems='center'
						gap='10px'>
						<Box>
							<Sunset
								size={50}
								strokeWidth={1}
							/>
						</Box>
						<Box>
							<Box
								fontSize='20px'
								fontWeight='bold'>
								Заход
							</Box>
							<Box
								fontWeight='medium'
								fontSize='18px'>
								{!isLoadingWeather && weather ? `${weather.sunset.split(':')[0]}:${weather.sunset.split(':')[1]}` : <Skeleton h='20px' />}
							</Box>
						</Box>
					</Flex>
				</Flex>
			</Flex>
			<Box>
				{!isLoadingWeather && weather ? (
					<>
						<Image
							boxSize={{ base: '120px', md: '100px', lg: 150, xl: 180 }}
							src={weatherIcons[weather.icon].image}
							alt=''
							mx='auto'
						/>
						<Heading
							as='h3'
							textAlign='center'
							mt={{ base: '8px', sm: '12px' }}
							fontSize={{ base: '20px', sm: '24px' }}>
							{weatherIcons[weather.icon].nameRu}
						</Heading>
					</>
				) : (
					<Skeleton height='180px' />
				)}
			</Box>
			<Grid
				gridTemplateColumns='1fr 1fr'
				gap='20px'>
				{!isLoadingWeather && weather ? (
					<>
						<WeatherDetailsStat
							type='humidity'
							text={weather.humidity}
							symbol='%'
						/>
						<WeatherDetailsStat
							type='wind'
							text={weather.windspeed}
							symbol='м/с'
						/>
						<WeatherDetailsStat
							type='pressure'
							text={weather.pressure}
							symbol='мм.рт.ст'
						/>
						<WeatherDetailsStat
							type='uv'
							text={weather.uvindex}
						/>
					</>
				) : (
					<>
						<Skeleton
							width='100px'
							height='100px'></Skeleton>
						<Skeleton
							width='100px'
							height='100px'></Skeleton>
						<Skeleton
							width='100px'
							height='100px'></Skeleton>
						<Skeleton
							width='100px'
							height='100px'></Skeleton>
					</>
				)}
			</Grid>
		</Grid>
	);
}
