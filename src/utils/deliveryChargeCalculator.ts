import { FeeCalculatorConstants } from './appConstants';

const {
    bulkItemFee,
    extraItemFee,
    freeDeliveryCartValue,
    maxRushHour,
    minCartValue,
    minDistance,
    minDistanceFee,
    minItemAmount,
    minRushHour,
    rushHourDay,
    stepDistance,
    stepDistanceFee,
    bulkItemNumber,
    rushHourMultiplier,
} = FeeCalculatorConstants;

/**
 * Calculates delivery fee
 * @param {number} cartValue cart price in format 00.00 euro
 * @param {number} deliveryDistance distance as an integer
 * @param {number} numberOfItems total items in cart
 * @param {number} time time of delivery
 * @returns {number} delivery fee in cents
 */

function deliveryChargeCalculator(
    cartValue: number,
    deliveryDistance: number,
    numberOfItems: number,
    time: Date
): number {
    const cartValueInCents = Math.round(cartValue * 100);
    let deliveryFeeInCents = 0;

    if (cartValueInCents >= freeDeliveryCartValue) {
        return deliveryFeeInCents;
    }

    if (cartValueInCents < minCartValue) {
        deliveryFeeInCents += minCartValue - cartValueInCents;
    }

    if (deliveryDistance > 0) {
        deliveryFeeInCents += minDistanceFee;
    }

    if (deliveryDistance > minDistance) {
        const extraDistance = deliveryDistance - minDistance;
        deliveryFeeInCents +=
            Math.ceil(extraDistance / stepDistance) * stepDistanceFee;
    }

    if (numberOfItems > minItemAmount) {
        const extraItems = numberOfItems - minItemAmount;
        deliveryFeeInCents += extraItems * extraItemFee;

        if (numberOfItems > bulkItemNumber) {
            deliveryFeeInCents += bulkItemFee;
        }
    }

    if (
        time.getDay() === rushHourDay &&
        time.getHours() <= maxRushHour &&
        time.getHours() >= minRushHour
    ) {
        deliveryFeeInCents = Math.round(
            deliveryFeeInCents * rushHourMultiplier
        );
    }

    if (deliveryFeeInCents > 1500) {
        return NaN;
    }

    return deliveryFeeInCents;
}

export default deliveryChargeCalculator;
