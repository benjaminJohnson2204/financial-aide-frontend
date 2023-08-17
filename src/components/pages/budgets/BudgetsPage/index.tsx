import {
  BudgetCategoryRelationResponse,
  BudgetResponse,
  IntervalEnum,
  UserResponse,
} from '@/api-client';
import { BudgetCardsContainer, BudgetsTopRow, NewBudgetButton } from './styles';
import { Add } from '@mui/icons-material';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { Colors } from '@/constants/colors';
import { useEffect, useMemo, useState } from 'react';
import { BudgetCard } from '@/components/cards/BudgetCard';
import { NewBudgetPopup } from '@/components/popups/budgets/NewBudgetPopup';
import { useBudgets } from '@/utils/backendAPI/budgets';
import { useBudgetCategoryRelations } from '@/utils/backendAPI/budgetCategoryRelations';
import { useRedirect } from '@/utils/redirect';

export const BudgetsPage = () => {
  const [newBudgetPopupOpen, setNewBudgetPopupOpen] = useState(false);

  const { budgets, loadingBudgets, refreshBudgets } = useBudgets();
  const budgetIds = useMemo(
    // Memoize to avoid infinite updates
    () => budgets?.map((budget) => budget.id) ?? [],
    [budgets]
  );
  const {
    budgetIdsToCategoryRelations,
    loadingCategoryRelations,
    refreshCategoryRelations,
  } = useBudgetCategoryRelations(budgetIds);

  useEffect(() => {
    // Force refresh of category relations after budgets change (new/edit/delete)
    refreshCategoryRelations(true);
  }, [budgets]);

  useRedirect(true);

  return (
    <>
      <BudgetsTopRow>
        <Typography fontSize={36} fontWeight={600} color={Colors.DARK_GREEN}>
          Your Budgets
        </Typography>
        <NewBudgetButton
          disableRipple
          onClick={() => setNewBudgetPopupOpen(true)}
        >
          <Add fontSize='large' style={{ color: Colors.WHITE }} />
        </NewBudgetButton>
      </BudgetsTopRow>
      <BudgetCardsContainer container gap={2} padding={4}>
        {loadingBudgets ? <CircularProgress size={48} /> : null}
        {budgets && budgets.length === 0 ? (
          <Typography fontSize={14}>No budgets yet</Typography>
        ) : null}
        {budgets?.map((budget) => (
          <Grid item key={budget.id} xs={12} md={6} lg={4}>
            <BudgetCard
              budget={budget}
              categoryRelations={
                budgetIdsToCategoryRelations.get(budget.id) ?? []
              }
              afterSave={refreshBudgets}
              afterDelete={refreshBudgets}
            />
          </Grid>
        ))}
      </BudgetCardsContainer>

      <NewBudgetPopup
        isOpen={newBudgetPopupOpen}
        onClose={() => setNewBudgetPopupOpen(false)}
        afterCreate={refreshBudgets}
      />
    </>
  );
};
