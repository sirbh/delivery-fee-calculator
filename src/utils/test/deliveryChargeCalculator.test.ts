import { describe, expect, it } from 'vitest';
import deliveryChargeCalculator from '../deliveryChargeCalculator';

describe('delivery charge calculator', () => {
    it('should calulate surcharge for cart value less than 10 euro', () => {
        expect(
            deliveryChargeCalculator(8.9, 100, 1, new Date(2022, 1, 2, 14, 30))
        ).toBe(310);
    });

    it('should calulate surcharge for distance more than than 1000 meter', () => {
        expect(
            deliveryChargeCalculator(11, 1549, 1, new Date(2022, 1, 2, 14, 30))
        ).toBe(400);
    });

    it('should calulate surcharge if amount of items are more than 4', () => {
        expect(
            deliveryChargeCalculator(11, 1000, 7, new Date(2022, 1, 2, 14, 30))
        ).toBe(350);
    });

    it('should calulate surcharge if amount of items are more than 12', () => {
        expect(
            deliveryChargeCalculator(11, 1000, 14, new Date(2022, 1, 2, 14, 30))
        ).toBe(820);
    });

    it('should calulate surcharge during peak hour', () => {
        expect(
            deliveryChargeCalculator(
                11,
                1000,
                14,
                new Date(2023, 0, 27, 15, 30)
            )
        ).toBe(984);
    });

    it('should calculate delivery fee to be 0 for cart value more than or equal to 100 euro', () => {
        expect(
            deliveryChargeCalculator(
                100,
                1000,
                14,
                new Date(2023, 0, 27, 15, 30)
            )
        ).toBe(0);
    });

    it('should reutrn NaN for delivery fee more than 15 euro', () => {
        expect(
            deliveryChargeCalculator(
                90,
                5000,
                14,
                new Date(2023, 0, 27, 15, 30)
            )
        ).toBe(NaN);
    });
});
