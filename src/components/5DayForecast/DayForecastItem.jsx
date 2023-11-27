import { Flex, Image, Box } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { weatherIcons } from '../../utils/weatherIcons';
import { fahrenheitToCelsius } from '../../utils/celciusConverter';

export default function DayForecastItem({ data }) {
	return (
		<Flex
			alignItems='center'
			mt='2px'>
			<Image
				src={weatherIcons[data['icon']].image}
				alt={weatherIcons[data['icon']].nameRu}
				boxSize={{ base: '50px', x1440: '60px' }}
				mr='10px'
			/>
			<Box
				w={{ base: '40px', x1440: '60px' }}
				fontSize={{ lg: '20px', x1440: '24px' }}
				fontWeight={500}
				mr={{ base: '14px', lg: '20px', x1440: '30px' }}
				textAlign='right'>
				{fahrenheitToCelsius(data['temp'])}°C
			</Box>
			<Box
				fontSize={{ lg: '18px', x1440: '22px' }}
				fontWeight={500}
				textAlign='right'
				ml='auto'
				justifySelf='flex-end'>
				{dayjs(data.datetime).locale('ru').format('dddd, DD MMM')}
			</Box>
		</Flex>
	);
}
