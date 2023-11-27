import { Box, Image, useColorMode } from '@chakra-ui/react';
export default function WeatherDetailsStat({ type, text, symbol }) {
	const { colorMode, toggleColorMode } = useColorMode();

	const statsOptions = {
		humidity: {
			text: 'Влажность',
			icon: { light: '/stats/humidity-l.svg', dark: '/stats/humidity-d.svg' },
		},
		pressure: {
			text: 'Давление',
			icon: { light: '/stats/pressure-l.svg', dark: '/stats/pressure-d.svg' },
		},
		uv: {
			text: 'Уф',
			icon: { light: '/stats/uv-l.svg', dark: '/stats/uv-d.svg' },
		},
		wind: {
			text: 'Ветер',
			icon: { light: '/stats/wind-l.svg', dark: '/stats/wind-d.svg' },
		},
	};

	return (
		<Box>
			<Image
				src={statsOptions[type].icon[colorMode]}
				boxSize={{ base: '40px', sm: '50px' }}
				mx='auto'
			/>
			<Box
				textAlign='center'
				fontWeight={500}
				fontSize={{ base: '16px', sm: '20px' }}
				mt='2px'>
				{text + ` ${symbol ? symbol : ''}`}
			</Box>
			<Box
				textAlign='center'
				mt='4px'
				fontSize={{ base: '14px', sm: '16px' }}>
				{statsOptions[type].text}
			</Box>
		</Box>
	);
}
