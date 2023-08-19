import {
  BudgetCategoryRelationResponse,
  BudgetResponse,
  IntervalEnum,
  UserResponse,
} from '@/api-client';

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

export const getCategoryRelationTotalAmount = (
  categoryRelation: BudgetCategoryRelationResponse,
  budget: BudgetResponse
) => {
  const durationMs =
    new Date(budget.end_time).getTime() - new Date(budget.start_time).getTime();
  const durationDays = durationMs / 1000 / 60 / 60 / 24;
  let daysMultiplier = 1;
  switch (budget.interval) {
    case IntervalEnum.Yearly:
      daysMultiplier = 365;
      break;
    case IntervalEnum.Monthly:
      daysMultiplier = 30;
      break;
    case IntervalEnum.Weekly:
      daysMultiplier = 7;
      break;
  }
  const budgetMultiplier = durationDays / daysMultiplier;
  return (
    Math.round(
      budgetMultiplier *
        getCategoryRelationRawAmount(
          categoryRelation,
          parseFloat(budget.income)
        ) *
        100
    ) / 100
  );
};
