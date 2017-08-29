// USD -> CAD 23
// 23 USD is worth 28 CAD. You can spend these in the following countries;
const axios = require('axios');

const getExchangeRate = (from, to) => {
	return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
		return response.data.rates[to];
	});
};

const getContries = (currencyCode) => {
	return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
		return response.data.map((country) => country.name)
	});
};

const convertCurrency = (from, to, amount) => {
	let countries;
	return getContries(to).then((tempCountries) => {
		countries = tempCountries;
		return getExchangeRate(from, to);
	}).then((rate) => {
		const exchangedAmount = amount * rate;

		return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in following countries: ${countries.join(', ')}`;
	});
};

// Create convertCurrencyAlt as async function
// Get countries and rate using await and our two function
// Calculate exchangedAmount
// Return status string

const convertCurrencyAlt = async (from, to, amount) => {
	const countries = await getContries(to);
	const rate = await getExchangeRate(from, to);
	const exchangedAmount = amount * rate;
	return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in following countries: ${countries.join(', ')}`;
};

convertCurrencyAlt('CNY', 'USD', 100).then((status) => {
	console.log(status);
});