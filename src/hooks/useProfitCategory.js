import { useMemo } from 'react';

function useProfitCategory(profit) {
  return useMemo(() => {
    if (profit >= 1000) return "High Profit";
    if (profit >= 500) return "Moderate Profit";
    if (profit > 0) return "Low Profit";
    if (profit === 0) return "Break Even";
    return "Loss";
  }, [profit]);
}

export default useProfitCategory;