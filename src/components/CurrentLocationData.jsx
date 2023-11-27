import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Skeleton, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ru';
dayjs.extend(timezone);
export default function CurrentLocationData() {
	const { currentTime: currentTimeStore, timezoneStore } = useSelector((state) => state.weather);
	const { city: currentCity, isLoadingCity } = useSelector((state) => state.coords);
	const bg = useColorModeValue('#d9d9d9', '#444');

	const day = dayjs(currentTimeStore).locale('ru').format('dddd');
	const dayFormated =
		day.split('')[0].toUpperCase() +
		day
			.split('')
			.splice(1, day.length - 1)
			.join('');

	const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm'));
	const [currentDay, setCurrentDay] = useState(dayFormated);
	const [currentDate, setCurrentDate] = useState(dayjs().tz(timezoneStore).locale('ru').format('DD MMMM'));

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(dayjs().tz(timezoneStore).format('HH:mm'));
		}, 1000);

		return () => clearInterval(timer);
	});

	useEffect(() => {
		setCurrentTime(dayjs().tz(timezoneStore).format('HH:mm'));
		setCurrentDate(dayjs().tz(timezoneStore).locale('ru').format('DD MMMM'));
		const dayNew = dayjs().tz(timezoneStore).locale('ru').format('dddd');
		const dayNewFormated =
			dayNew.split('')[0].toUpperCase() +
			dayNew
				.split('')
				.splice(1, dayNew.length - 1)
				.join('');
		setCurrentDay(dayNewFormated);
	}, [timezoneStore]);

	return (
		<Flex
			py={{ base: '30px', sm: '50px' }}
			px={{ base: '30px', sm: '50px' }}
			flexDirection='column'
			alignItems='center'
			className='box'
			bgColor={bg}
			height='100%'>
			<Box
				fontSize={{ base: '24px', sm: '30px' }}
				lineHeight='1.2'
				fontWeight='bold'
				textAlign='center'
				width='100%'>
				{!isLoadingCity ? (
					currentCity
				) : (
					<Skeleton
						height='36px'
						width='100%'></Skeleton>
				)}
			</Box>
			<Heading
				as='h1'
				mt={{ base: '12px', sm: '30px' }}
				lineHeight='1.2'
				fontSize={{ base: '64px', sm: '96px' }}>
				{currentTime}
			</Heading>
			<Box
				lineHeight='1.5'
				fontSize={{ base: '18px', sm: '20px' }}>
				{currentDay}, {currentDate}
			</Box>
		</Flex>
	);
}
