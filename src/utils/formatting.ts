import { BudgetCategoryRelationResponse, UserResponse } from '@/api-client';

export const formatCategoryRelationAmount = (
  categoryRelation: BudgetCategoryRelationResponse
) => {
  if (categoryRelation.is_percentage) {
    return `${categoryRelation.amount}%`;
  }
  return `$${categoryRelation.amount}`;
};

export const capitalizeString = (str: string) => {
  if (!str || str.length === 0) {
    return str;
  }
  if (str.length === 1) {
    return str.toUpperCase();
  }
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export const getCategoryRelationRawAmount = (
  categoryRelation: BudgetCategoryRelationResponse,
  income: number
) => {
  return categoryRelation.is_percentage
    ? Math.round((parseFloat(categoryRelation.amount) * income) / 100)
    : parseFloat(categoryRelation.amount);
};
