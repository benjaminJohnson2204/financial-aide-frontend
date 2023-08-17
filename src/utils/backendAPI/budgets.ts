import { BudgetResponse, BudgetsApiAxiosParamCreator } from '@/api-client';
import { useEffect, useState } from 'react';
import { backendClient } from './backendClient';

/**
 * Hook for fetching current user's budgets from backend
 */
export const useBudgets = () => {
  const [budgets, setBudgets] = useState<BudgetResponse[]>();
  const [loadingBudgets, setLoadingBudgets] = useState(false);
  const [budgetsFetchingError, setBudgetsFetchingError] = useState('');

  const budgetsClient = BudgetsApiAxiosParamCreator();
  const refreshBudgets = (page?: number) => {
    setLoadingBudgets(true);
    budgetsClient.apiBudgetsBudgetsList(page).then(({ url, options }) =>
      backendClient
        .get(url, options)
        .then((response) => setBudgets(response.data.results))
        .catch(setBudgetsFetchingError)
        .finally(() => setLoadingBudgets(false))
    );
  };

  useEffect(() => refreshBudgets(), []);

  return {
    budgets,
    loadingBudgets,
    budgetsFetchingError,
    refreshBudgets,
  };
};
