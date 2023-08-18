import { Colors } from '@/constants/colors';
import { AuthContext } from '@/contexts/authContext';
import { useRedirect } from '@/utils/redirect';
import { Box, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { HomePageBox } from './styles';
import { CustomButton } from '@/components/buttons/CustomButton';
import { LinkNoUnderline } from '@/components/layout/Navbar/styles';
import { NewBudgetPopup } from '@/components/popups/budgets/NewBudgetPopup';
import { useBudgetCategoryRelations } from '@/utils/backendAPI/budgetCategoryRelations';
import { useBudgets } from '@/utils/backendAPI/budgets';
import { useExpenses } from '@/utils/backendAPI/expenses';
import { EnterExpensePopup } from '@/components/popups/expenses/EnterExpensePopup';
import { Add } from '@mui/icons-material';
import { BudgetCard } from '@/components/cards/BudgetCard';
import { ExpensesTable } from '../expenses/ExpensesTable';

export const HomePage = () => {
  const [newBudgetPopupOpen, setNewBudgetPopupOpen] = useState(false);
  const [enterExpensePopupOpen, setEnterExpensePopupOpen] = useState(false);

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
  const { expenses, loadingExpenses, refreshExpenses } = useExpenses();

  useEffect(() => {
    // Force refresh of category relations after user adds budget
    refreshCategoryRelations(true);
  }, [budgets]);

  useRedirect(true);

  const { user } = useContext(AuthContext);

  return (
    <>
      <Typography
        fontSize={36}
        fontWeight={600}
        color={Colors.BLACK}
        textAlign='center'
      >
        Welcome, {user?.username}!
      </Typography>
      <Grid container spacing={5} marginTop={1}>
        <Grid item xs={12} xl={5}>
          <HomePageBox>
            <Box display='flex' flexDirection='row' gap={2} width='100%'>
              <Typography
                fontSize={28}
                fontWeight={600}
                textAlign='center'
                color={Colors.DARK_GREEN}
                width='100%'
              >
                Budgets
              </Typography>
              <Box display='flex' flexDirection='column' gap={2}>
                <LinkNoUnderline href='/budgets'>
                  <CustomButton
                    variant='contained'
                    primaryColor={Colors.DARK_GREEN}
                    secondaryColor={Colors.WHITE}
                  >
                    See All
                  </CustomButton>
                </LinkNoUnderline>
                <CustomButton
                  variant='outlined'
                  primaryColor={Colors.DARK_PURPLE}
                  secondaryColor={Colors.WHITE}
                  onClick={() => setNewBudgetPopupOpen(true)}
                >
                  <Add />
                  New
                </CustomButton>
              </Box>
            </Box>

            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              gap={2}
              marginTop={4}
            >
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
            </Box>
          </HomePageBox>
        </Grid>
        <Grid item xs={12} xl={7}>
          <HomePageBox>
            <Box display='flex' flexDirection='row' gap={2} width='100%'>
              <Typography
                fontSize={28}
                fontWeight={600}
                textAlign='center'
                color={Colors.DARK_GREEN}
                width='100%'
              >
                Expenses
              </Typography>
              <Box display='flex' flexDirection='column' gap={2}>
                <LinkNoUnderline href='/expenses'>
                  <CustomButton
                    variant='contained'
                    primaryColor={Colors.DARK_GREEN}
                    secondaryColor={Colors.WHITE}
                  >
                    See All
                  </CustomButton>
                </LinkNoUnderline>
                <CustomButton
                  variant='outlined'
                  primaryColor={Colors.DARK_PURPLE}
                  secondaryColor={Colors.WHITE}
                  onClick={() => setEnterExpensePopupOpen(true)}
                >
                  <Add />
                  Enter New
                </CustomButton>
              </Box>
            </Box>

            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              gap={2}
              marginTop={2}
            >
              <ExpensesTable
                allExpenses={expenses}
                afterSave={refreshExpenses}
                afterDelete={refreshExpenses}
              />
            </Box>
          </HomePageBox>
        </Grid>
      </Grid>

      <NewBudgetPopup
        isOpen={newBudgetPopupOpen}
        onClose={() => setNewBudgetPopupOpen(false)}
        afterCreate={refreshBudgets}
      />
      <EnterExpensePopup
        isOpen={enterExpensePopupOpen}
        onClose={() => setEnterExpensePopupOpen(false)}
        afterCreate={refreshExpenses}
      />
    </>
  );
};
