import { Box, ColorModeScript, Flex, extendTheme, useColorModeValue, Grid, GridItem } from '@chakra-ui/react';
import ThemeModeButton from './components/ThemeModeButton';
import SearchField from './components/SearchField';
import CurrentLocationButton from './components/CurrentLocationButton';
import CurrentLocationData from './components/CurrentLocationData';
import WeatherDetails from './components/WeatherDetails';
import FiveDayForecast from './components/5DayForecast';
import HourlyForecast from './components/HourlyForecast';

import { globalTheme } from './themes/global.theme';
const theme = extendTheme({ ...globalTheme });
function App() {
	const bg = useColorModeValue('linear(to-r, #BDBBBB, #8e8e8e, #9b9a9a)', 'linear-gradient(to right, #393737, #201d1d, #393737)');
	const mainTextColor = useColorModeValue('#292929', '#fff');
	return (
		<>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<Flex
				justifyContent='center'
				alignItems='center'
				maxWidth='1500px'
				width='100%'
				m='auto'
				py={{ base: '20px', lg: '40px', x1440: '60px' }}
				px={{ base: '24px', lg: '40px', x1440: '80px' }}
				borderRadius={{ sm: '16px' }}
				bgGradient={bg}
				transitionDuration='.3s'
				color={mainTextColor}>
				<Box width='100%'>
					<Grid
						width='100%'
						gridTemplateColumns={{ base: '1fr 100px 55px', lg: '100px 1fr 260px' }}
						gap='20px'
						alignItems={{ lg: 'center' }}>
						<GridItem gridColumn={{ base: 2, lg: 1 }}>
							<ThemeModeButton />
						</GridItem>
						<GridItem
							gridRow={{ base: '1/3', lg: 1 }}
							gridColumn={{ base: 1, lg: 2 }}>
							<SearchField />
						</GridItem>
						<GridItem>
							<CurrentLocationButton />
						</GridItem>
					</Grid>
					<Grid
						mt={{ lg: '36px', x1440: '50px' }}
						gap={{ base: '16px', md: '24px', lg: '40px', x1440: '40px 60px' }}
						gridTemplateColumns={{ x1170: 'repeat(10, 1fr)' }}
						gridRow={{ x1170: '1/2' }}>
						<GridItem gridArea={{ x1170: '1/1/2/2' }}>
							<CurrentLocationData />
						</GridItem>
						<GridItem gridArea={{ x1170: '1/2/2/11' }}>
							<WeatherDetails />
						</GridItem>
						<GridItem gridArea={{ x1170: '3/1/4/11', xl: '2/1/3/3' }}>
							<FiveDayForecast />
						</GridItem>
						<GridItem gridArea={{ x1170: '2/1/3/11', xl: '2/3/3/11' }}>
							<HourlyForecast />
						</GridItem>
					</Grid>
				</Box>
			</Flex>
		</>
	);
}

export default App;
