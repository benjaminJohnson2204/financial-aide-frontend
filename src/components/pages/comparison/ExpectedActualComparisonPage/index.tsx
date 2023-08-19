import { CustomButton } from '@/components/buttons/CustomButton';
import { StyledTab, StyledTabs } from '@/components/tabs/StyledTabs';
import { Colors } from '@/constants/colors';
import { Download } from '@mui/icons-material';
import {
  Box,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { ExpensesTopRow } from '../../expenses/ExpensesPage/styles';
import {
  BudgetCategoryRelationResponse,
  BudgetCategoryResponse,
  BudgetResponse,
  BudgetsApiAxiosParamCreator,
  ExpensesApiAxiosParamCreator,
  ExpensesByCategory,
} from '@/api-client';
import { useBudgets } from '@/utils/backendAPI/budgets';
import { CustomInputField } from '@/components/inputs/InputField';
import { useBudgetCategoryRelations } from '@/utils/backendAPI/budgetCategoryRelations';
import { useSpendingByCategory } from '@/utils/backendAPI/spendingByCategory';
import { ComparisonBarChart } from '../ComparsionBarChart';
import { CategoriesPieChart } from '../../budgets/CategoriesPieChart';
import { getCategoryRelationTotalAmount } from '@/utils/formatting';
import { useCategories } from '@/utils/backendAPI/categories';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const ExpectedActualComparisonPage = () => {
  const router = useRouter();
  const [viewTab, setViewTab] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<
    number | 'Select an option'
  >('Select an option');

  const budgetsClient = BudgetsApiAxiosParamCreator();
  const expensesClient = ExpensesApiAxiosParamCreator();
  const { budgets } = useBudgets();
  const { budgetIdsToCategoryRelations } = useBudgetCategoryRelations(
    selectedBudgetId === 'Select an option' ? [] : [selectedBudgetId]
  );

  useEffect(() => {
    if (
      router.query.budgetId &&
      !isNaN(parseInt(router.query.budgetId as string))
    ) {
      setSelectedBudgetId(parseInt(router.query.budgetId as string));
    }
  }, [router.query]);

  const budgetIdsToBudgets = useMemo(() => {
    const result = new Map<number, BudgetResponse>();
    if (!budgets) {
      return result;
    }
    for (const budget of budgets) {
      result.set(budget.id, budget);
    }
    return result;
  }, [budgets]);

  const categoryIdsToCategoryRelations = useMemo(() => {
    const result = new Map<number, BudgetCategoryRelationResponse>();
    if (!budgetIdsToCategoryRelations) {
      return result;
    }
    for (const [budgetId, categoryRelations] of Array.from(
      budgetIdsToCategoryRelations
    )) {
      for (const categoryRelation of categoryRelations) {
        result.set(categoryRelation.category.id, categoryRelation);
      }
    }
    return result;
  }, [budgetIdsToCategoryRelations]);

  const { categories } = useCategories();

  const categoryIdsToCategories = useMemo(() => {
    const result = new Map<number, BudgetCategoryResponse>();
    if (!categories) {
      return result;
    }
    for (const category of categories) {
      result.set(category.id, category);
    }
    return result;
  }, [categories]);

  const { spendingByCategory } = useSpendingByCategory({
    minTimestamp: budgetIdsToBudgets.get(selectedBudgetId as number)
      ?.start_time,
    maxTimestamp: budgetIdsToBudgets.get(selectedBudgetId as number)?.end_time,
  });

  expensesClient.apiExpensesExpensesByCategoryList();

  const downloadData = () => {
    if (!selectedBudgetId) return;
    setDownloading(true);
    budgetsClient
      .apiBudgetsBudgetsSpendingExportRetrieve(selectedBudgetId as number)
      .then(({ url, options }) =>
        backendClient.get(url, options).then((response) => {
          const link = document.createElement('a');
          const blob = new Blob([response.data], {
            type: 'text/csv',
          });
          const fileUrl = window.URL.createObjectURL(blob);
          link.href = fileUrl;
          link.download = 'spending_comparison.csv';
          document.body.append(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(fileUrl);
        })
      )
      .catch((error) => {
        toast.error('Unable to download data');
      })
      .finally(() => setDownloading(false));
  };

  const renderTable = () => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontSize={14} fontWeight={600}>
                Category
              </Typography>
            </TableCell>
            <TableCell>
              <Typography fontSize={14} fontWeight={600}>
                Planned ($)
              </Typography>
            </TableCell>
            <TableCell>
              <Typography fontSize={14} fontWeight={600}>
                Actual ($)
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spendingByCategory?.map(({ total_amount, id }) => (
            <TableRow key={id}>
              <TableCell>
                <Typography fontSize={14}>
                  {categoryIdsToCategories.get(id)?.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={14}>
                  {categoryIdsToCategoryRelations.has(id) &&
                  budgetIdsToBudgets.has(selectedBudgetId as number)
                    ? getCategoryRelationTotalAmount(
                        categoryIdsToCategoryRelations.get(id)!,
                        budgetIdsToBudgets.get(selectedBudgetId as number)!
                      )
                    : 0}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={14}>{total_amount}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderBarChart = () => {
    return (
      <ComparisonBarChart
        categories={
          spendingByCategory?.map(({ total_amount, id }) => ({
            category: categoryIdsToCategories.get(id)!,
            plannedAmount:
              categoryIdsToCategoryRelations.has(id) &&
              budgetIdsToBudgets.has(selectedBudgetId as number)
                ? getCategoryRelationTotalAmount(
                    categoryIdsToCategoryRelations.get(id)!,
                    budgetIdsToBudgets.get(selectedBudgetId as number)!
                  )
                : 0,
            actualAmount: total_amount,
          })) ?? []
        }
      />
    );
  };

  const renderPieCharts = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography fontSize={24} fontWeight={600} textAlign='center'>
            Planned
          </Typography>
          <CategoriesPieChart
            categories={
              budgetIdsToCategoryRelations
                .get(selectedBudgetId as number)
                ?.map((categoryRelation) => ({
                  category: categoryRelation.category,
                  rawAmount:
                    categoryIdsToCategoryRelations.has(
                      categoryRelation.category.id
                    ) && budgetIdsToBudgets.has(selectedBudgetId as number)
                      ? getCategoryRelationTotalAmount(
                          categoryIdsToCategoryRelations.get(
                            categoryRelation.category.id
                          )!,
                          budgetIdsToBudgets.get(selectedBudgetId as number)!
                        )
                      : 0,
                })) ?? []
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography fontSize={24} fontWeight={600} textAlign='center'>
            Actual
          </Typography>
          {spendingByCategory?.some(({ total_amount }) => total_amount > 0) ? (
            <CategoriesPieChart
              categories={
                spendingByCategory?.map(({ total_amount, id }) => ({
                  category: categoryIdsToCategories.get(id)!,
                  rawAmount: total_amount,
                })) ?? []
              }
            />
          ) : (
            <Typography
              fontSize={18}
              textAlign='center'
              color={Colors.DARK_PURPLE}
              marginTop={2}
            >
              No data yet
            </Typography>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <ExpensesTopRow>
        <Typography
          fontSize={36}
          fontWeight={600}
          color={Colors.BLACK}
          textAlign='center'
        >
          Planned vs. Actual Expenses
        </Typography>
        <Box width={180}>
          {selectedBudgetId == 'Select an option' ? null : (
            <CustomButton
              disabled={downloading}
              variant='contained'
              primaryColor={Colors.DARK_PURPLE}
              secondaryColor={Colors.WHITE}
              onClick={downloadData}
              style={{
                width: 200,
              }}
            >
              <Download />
              Download as CSV
            </CustomButton>
          )}
        </Box>
      </ExpensesTopRow>
      <CustomInputField
        editable
        inputType='select'
        label='Budget'
        name='budget'
        selectContents={[
          <MenuItem key='Select an option' value='Select an option'>
            Select an option
          </MenuItem>,
          ...(budgets ?? []).map((budget) => (
            <MenuItem key={budget.id} value={budget.id}>
              {budget.name}
            </MenuItem>
          )),
        ]}
        onChange={setSelectedBudgetId}
        defaultValue={selectedBudgetId.toString()}
      />
      {selectedBudgetId === 'Select an option' ? null : (
        <>
          <div style={{ height: 25 }} />
          <StyledTabs
            value={viewTab}
            onChange={(e, value) => setViewTab(value)}
          >
            <StyledTab value={0} label='Table' />
            <StyledTab value={1} label='Bar Chart' />
            <StyledTab value={2} label='Pie Chart' />
          </StyledTabs>

          <Box marginTop={3} width='100%'>
            {viewTab === 0
              ? renderTable()
              : viewTab === 1
              ? renderBarChart()
              : renderPieCharts()}
          </Box>
        </>
      )}
    </Box>
  );
};
