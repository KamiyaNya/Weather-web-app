import { useState } from 'react';
import { Box, Switch, useColorMode } from '@chakra-ui/react';

export default function ThemeModeButton() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box
			display='flex'
			justifyContent='center'
			flexDirection='column'
			alignItems='center'
			w='100px'
			minW='100px'
			fontWeight='bold'
			fontSize='18px'
			lineHeight='1.2'>
			<Box>
				<Switch
					onChange={toggleColorMode}
					size='lg'
				/>
			</Box>
			<Box mt='6px'>{colorMode === 'light' ? 'Light Mode' : 'Dark Mode'}</Box>
		</Box>
	);
}
