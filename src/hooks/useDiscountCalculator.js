import { useMemo } from 'react';

function useDiscountCalculator(amount) {
  // Business logic: apply tiered discounts based on amount
  const result = useMemo(() => {
    let discount = 0;
    if (amount > 1000) {
      discount = 0.2;
    } else if (amount > 500) {
      discount = 0.1;
    } else if (amount > 100) {
      discount = 0.05;
    }
    const discountedAmount = amount - amount * discount;
    return {
      originalAmount: amount,
      discountRate: discount,
      discountedAmount: parseFloat(discountedAmount.toFixed(2))
    };
  }, [amount]);

  return result;
}

export default useDiscountCalculator;