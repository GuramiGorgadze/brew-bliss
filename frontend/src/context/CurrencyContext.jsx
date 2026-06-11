import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const currencies = [
  { code: 'USD', label: 'USD ($)', locale: 'en-US', rate: 1.0 },
  { code: 'EUR', label: 'EUR (€)', locale: 'de-DE', rate: 0.92 },
  { code: 'GBP', label: 'GBP (£)', locale: 'en-GB', rate: 0.79 },
];

export function CurrencyProvider({ children }) {
  const [currentCurrency, setCurrentCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'USD';
  });

  const activeCurrency = currencies.find((c) => c.code === currentCurrency) || currencies[0];

  const changeCurrency = (code) => {
    setCurrentCurrency(code);
    localStorage.setItem('currency', code);
  };

  const formatPrice = (amountInUSD) => {
    const convertedAmount = amountInUSD * activeCurrency.rate;

    return new Intl.NumberFormat(activeCurrency.locale, {
      style: 'currency',
      currency: activeCurrency.code,
    }).format(convertedAmount);
  };

  return (
    <CurrencyContext.Provider value={{ activeCurrency, changeCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
