import { useMemo } from 'react';

function useProfitCalculator(cost, salePrice) {
  const result = useMemo(() => {
    const profit = salePrice - cost;
    const marginPercent = cost > 0 ? ((profit / cost) * 100).toFixed(2) : 0;
    return {
      cost,
      salePrice,
      profit: profit.toFixed(2),
      marginPercent
    };
  }, [cost, salePrice]);

  return result;
}

export default useProfitCalculator;