import { ExpenseResponse, ExpensesApiAxiosParamCreator } from '@/api-client';
import { useEffect, useState } from 'react';
import { backendClient } from './backendClient';

interface UseExpenseProps {
  categoryId?: number;
  categoryIdIn?: number[];
  minTimestamp?: Date;
  maxTimestamp?: Date;
  ordering?: string;
  page?: number;
  search?: string;
  timestamp?: Date;
}

/**
 * Hook for fetching current user's expenses from backend
 */
export const useExpenses = (options?: UseExpenseProps) => {
  const {
    categoryId,
    categoryIdIn,
    minTimestamp,
    maxTimestamp,
    ordering,
    page,
    search,
    timestamp,
  } = options ?? {};

  const [expenses, setExpenses] = useState<ExpenseResponse[]>();
  const [expensesCount, setExpensesCount] = useState<number>();
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [expensesFetchingError, setExpensesFetchingError] = useState('');

  const expensesClient = ExpensesApiAxiosParamCreator();
  const refreshExpenses = () => {
    setLoadingExpenses(true);
    expensesClient
      .apiExpensesExpensesList(
        categoryId,
        categoryIdIn,
        ordering,
        page,
        search,
        timestamp,
        minTimestamp,
        maxTimestamp
      )
      .then(({ url, options }) =>
        backendClient
          .get(url, options)
          .then((response) => {
            setExpenses(response.data.results);
            setExpensesCount(response.data.count);
          })
          .catch(setExpensesFetchingError)
          .finally(() => setLoadingExpenses(false))
      );
  };

  useEffect(
    () => refreshExpenses(),
    [
      categoryId,
      categoryIdIn,
      minTimestamp,
      maxTimestamp,
      ordering,
      page,
      search,
      timestamp,
    ]
  );

  return {
    expenses,
    expensesCount,
    loadingExpenses,
    expensesFetchingError,
    refreshExpenses,
  };
};
