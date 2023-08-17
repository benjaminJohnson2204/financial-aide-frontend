import {
  BudgetCategoriesApiAxiosParamCreator,
  BudgetCategoryResponse,
} from '@/api-client';
import { useEffect, useState } from 'react';
import { backendClient } from './backendClient';

/**
 * Hook for fetching available budget categories from backend
 */
export const useCategories = () => {
  const [categories, setCategories] = useState<BudgetCategoryResponse[]>();
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesFetchingError, setCategoriesFetchingError] = useState('');

  const categoriesClient = BudgetCategoriesApiAxiosParamCreator();
  const refreshCategories = (page?: number, search?: string) => {
    setLoadingCategories(true);
    categoriesClient
      .apiBudgetsBudgetCategoriesList(page, search)
      .then(({ url, options }) =>
        backendClient
          .get(url, options)
          .then((response) => setCategories(response.data.results))
          .catch((error) => setCategoriesFetchingError(error))
          .finally(() => setLoadingCategories(false))
      );
  };

  useEffect(refreshCategories, []);

  return {
    categories,
    loadingCategories,
    categoriesFetchingError,
    refreshCategories,
  };
};
