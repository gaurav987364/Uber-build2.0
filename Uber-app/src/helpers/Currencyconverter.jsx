const API_KEY = 'fca_live_DLALN2bV4mtmtt3agV5ZRmcXQwsKel9qr0JKoBld';
const API_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

export const Currencyconverter = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};

export async function convertCurrency(amount, fromCurrency, toCurrency) {
  const rates = await Currencyconverter();
  
  if (!rates) {
    console.error('No rates data available');
    return null;
  }
  
  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];
  
  if (!fromRate || !toRate) {
    console.error('Invalid currency code');
    return null;
  }
  
  // Convert amount to USD first
  const amountInUSD = amount / fromRate;
  
  // Convert USD to the target currency
  const convertedAmount = amountInUSD * toRate;
  
  return parseFloat(convertedAmount).toFixed(2); // rounding to 2 decimal places
}
