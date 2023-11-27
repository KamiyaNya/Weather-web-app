import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import { switchTheme } from './themes/switch.theme.js';
import { globalTheme } from './themes/global.theme.js';
import { breakpoints } from './themes/breakpoints.theme.js';

import { store } from './redux/store';
import App from './App.jsx';
import '../src/styles/app.css';
const theme = extendTheme({ ...globalTheme, breakpoints, components: { Switch: switchTheme } });
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</Provider>
	</React.StrictMode>
);
