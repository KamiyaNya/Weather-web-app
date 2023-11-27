import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

export const switchTheme = defineMultiStyleConfig({
	// baseStyle: {
	// 	container: {
	// 		width: '80px',
	// 		height: '38px',
	// 	},
	// 	track: {
	// 		padding: '5px',
	// 		width: '100%',
	// 		height: '100%',
	// 	},
	// 	thumb: {
	// 		width: '30px',
	// 		height: '30px',
	// 	},
	// },
	
});
