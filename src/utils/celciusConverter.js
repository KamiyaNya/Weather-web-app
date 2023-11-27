export const fahrenheitToCelsius = (temp) => {
	const celcius = (((temp - 32) * 5) / 9).toFixed(0);
	if (Math.abs(celcius) === 0) {
		return 0;
	} else {
		return celcius;
	}
};
