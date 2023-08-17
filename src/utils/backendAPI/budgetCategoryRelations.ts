import {
  BudgetCategoryRelationResponse,
  BudgetCategoryRelationsApiAxiosParamCreator,
} from '@/api-client';
import { useEffect, useState } from 'react';
import { backendClient } from './backendClient';

export const useBudgetCategoryRelations = (budgetIds: number[]) => {
  const [budgetIdsToCategoryRelations, setBudgetIdsToCategoryRelations] =
    useState(new Map<number, BudgetCategoryRelationResponse[]>());
  const [loadingCategoryRelations, setLoadingCategoryRelations] =
    useState(false);
  const [categoryRelationsFetchingError, setCategoryRelationsFetchingError] =
    useState('');

  const categoryRelationsClient = BudgetCategoryRelationsApiAxiosParamCreator();

  const refreshCategoryRelations = async (forceReloadIds: boolean) => {
    setLoadingCategoryRelations(true);
    setCategoryRelationsFetchingError('');

    // Have to create a new map to give new memory address so that React knows it's updated
    // and fires state changes
    const newBudgetIdsToCategoryRelations = new Map(
      budgetIdsToCategoryRelations
    );

    const promises = [];

    for (const budgetId of budgetIds) {
      // If budget's category relations have already been fetched,
      // only fetch again if it's a force reload
      if (budgetIdsToCategoryRelations.has(budgetId) && !forceReloadIds) {
        continue;
      }

      promises.push(
        categoryRelationsClient
          .apiBudgetsBudgetCategoryRelationsList(budgetId)
          .then(({ url, options }) =>
            backendClient
              .get(url, options)
              .then((response) =>
                newBudgetIdsToCategoryRelations.set(
                  budgetId,
                  response.data.results
                )
              )
              .catch((error) => setCategoryRelationsFetchingError(error))
          )
      );

      await Promise.allSettled(promises);
      setBudgetIdsToCategoryRelations(newBudgetIdsToCategoryRelations);
      setLoadingCategoryRelations(false);
    }
  };

  useEffect(() => {
    refreshCategoryRelations(false);
  }, [budgetIds]);

  return {
    budgetIdsToCategoryRelations,
    loadingCategoryRelations,
    categoryRelationsFetchingError,
    refreshCategoryRelations,
  };
};
