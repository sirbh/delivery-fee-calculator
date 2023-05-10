export const FeeFormConstants = {
    formHeading: 'Delivery Fee Calculator',
    cartInputLabel: 'Cart value',
    distanceInputLabel: 'Delivery distance',
    itemsInputLabel: 'Number of items',
    submitLabel: 'Calculate',
    resetLabel: 'Reset',
    currencyUnit: '€',
    distanceUnit: 'meters',
    itemsAdornment: 'total items',
};
export const FeeCalculatorConstants = {
    // all currency values are in cents
    freeDeliveryCartValue: 10000,
    minCartValue: 1000,
    minDistance: 1000,
    stepDistance: 500,
    minDistanceFee: 200,
    stepDistanceFee: 100,
    extraItemFee: 50,
    bulkItemFee: 120,
    minItemAmount: 4,
    bulkItemNumber: 12,
    rushHourDay: 5, // 0 = sunday, 1 = monday .... 6 = saturday
    minRushHour: 15, // in military time format
    maxRushHour: 19, // in military time format
    rushHourMultiplier: 1.2,
};
