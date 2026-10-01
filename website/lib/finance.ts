export const expenseCurrencies = ["INR", "USD", "EUR", "GBP", "AED", "AUD", "CAD", "CHF", "CNY", "HKD", "JPY", "NZD", "SAR", "SGD", "THB", "TRY", "ZAR"] as const;

export type ExpenseCurrency = typeof expenseCurrencies[number];
