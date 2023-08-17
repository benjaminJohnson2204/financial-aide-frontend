import { ExpensesApiAxiosParamCreator, ExpensesByCategory } from '@/api-client';
import { useEffect, useState } from 'react';
import { backendClient } from './backendClient';

interface SpendingByCategoryProps {
  minTimestamp?: Date;
  maxTimestamp?: Date;
}

export const useSpendingByCategory = ({
  minTimestamp,
  maxTimestamp,
}: SpendingByCategoryProps) => {
  const [spendingByCategory, setSpendingByCategory] =
    useState<ExpensesByCategory[]>();
  const [loadingSpendingByCategory, setLoadingSpendingByCategory] =
    useState(false);
  const [spendingByCategoryError, setSpendingByCategoryError] = useState('');

  const expensesClient = ExpensesApiAxiosParamCreator();

  useEffect(() => {
    setLoadingSpendingByCategory(true);
    setSpendingByCategoryError('');

    expensesClient
      .apiExpensesExpensesByCategoryList(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        minTimestamp,
        maxTimestamp
      )
      .then(({ url, options }) =>
        backendClient.get(url, options).then((response) => {
          setSpendingByCategory(response.data.results);
        })
      )
      .catch(setSpendingByCategoryError)
      .finally(() => setLoadingSpendingByCategory(true));
  }, [minTimestamp, maxTimestamp]);

  return {
    spendingByCategory,
    loadingSpendingByCategory,
    spendingByCategoryError,
  };
};
