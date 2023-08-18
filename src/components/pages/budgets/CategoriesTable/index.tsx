import {
  BudgetCategoryRelationResponse,
  BudgetCategoryResponse,
  BudgetResponse,
  IntervalEnum,
} from '@/api-client';
import { Add, Remove } from '@mui/icons-material';
import {
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { CategoriesTableCell, CategoriesTableRow } from './styles';
import { Colors } from '@/constants/colors';
import { useCategories } from '@/utils/backendAPI/categories';
import { AuthInput } from '../../auth/common/styles';
import { SelectField } from '@/components/inputs/SelectField';

interface CategoriesTableProps {
  budget: BudgetResponse;
  editable: boolean;
  categoryRelations: BudgetCategoryRelationResponse[];
  onChangeCategoryRelations?: (
    newCategoryRelations: BudgetCategoryRelationResponse[]
  ) => unknown;
}

export const CategoriesTable = ({
  budget,
  editable,
  categoryRelations,
  onChangeCategoryRelations,
}: CategoriesTableProps) => {
  const removeRow = (index: number) => {
    onChangeCategoryRelations?.([
      ...categoryRelations.slice(0, index),
      ...categoryRelations.slice(index + 1),
    ]);
  };

  const addRow = () => {
    onChangeCategoryRelations?.([
      ...categoryRelations,
      {
        budget,
        amount: '',
        is_percentage: false,
      } as BudgetCategoryRelationResponse,
    ]);
  };

  const setCategoryRelation = (
    index: number,
    newCategoryRelation: BudgetCategoryRelationResponse
  ) => {
    onChangeCategoryRelations?.([
      ...categoryRelations.slice(0, index),
      newCategoryRelation,
      ...categoryRelations.slice(index + 1),
    ]);
  };

  const { categories, loadingCategories } = useCategories();

  const getAmountScaleFactor = () => {
    switch (budget.interval) {
      case IntervalEnum.Yearly:
        return 1 / 12;
      case IntervalEnum.Monthly:
        return 1;
      case IntervalEnum.Weekly:
        return 13 / 3;
    }
  };

  const adjustAmountFrequency = (amount: number) => {
    return Math.round((amount / getAmountScaleFactor()) * 100) / 100;
  };

  const rawToPercentage = (rawAmount: number) => {
    return rawAmount / parseFloat(budget.income);
  };

  const percentageToRaw = (percentage: number) => {
    return percentage * parseFloat(budget.income);
  };

  const getTypicalAmount = (
    categoryRelation: BudgetCategoryRelationResponse
  ) => {
    if (!categoryRelation.category) {
      return ''; // Must select category before seeing typical amount
    }
    if (!budget.income) {
      return '[Missing income]';
    }
    if (!budget.interval || (budget.interval as any) === 'Select an option') {
      return '[Missing frequency]';
    }
    if (categoryRelation.is_percentage) {
      // If it's a percentage, use typical percentage if available, otherwise
      // use typical raw amount if available, otherwise show nothing
      return categoryRelation.category.typical_percentage === null
        ? categoryRelation.category.typical_monthly_amount === null
          ? ''
          : `${rawToPercentage(
              adjustAmountFrequency(
                parseFloat(categoryRelation.category.typical_monthly_amount!)
              )
            )}%` ?? ''
        : `${categoryRelation.category.typical_percentage}%`;
    } else {
      return categoryRelation.category.typical_monthly_amount === null
        ? categoryRelation.category.typical_percentage === null
          ? ''
          : `$${percentageToRaw(
              parseFloat(categoryRelation.category.typical_percentage!)
            )}` ?? ''
        : `$${adjustAmountFrequency(
            parseFloat(categoryRelation.category.typical_monthly_amount!)
          )}`;
    }
  };

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
              {editable ? 'Percentage of Income?' : 'Percentage of Income'}
            </Typography>
          </TableCell>
          {editable ? (
            <TableCell>
              <Typography fontSize={14} fontWeight={600}>
                Typical Amount
              </Typography>
            </TableCell>
          ) : null}
          <TableCell>
            <Typography fontSize={14} fontWeight={600}>
              Amount
            </Typography>
          </TableCell>
          {editable ? <TableCell /> : null}
        </TableRow>
      </TableHead>
      <TableBody>
        {categoryRelations.map((categoryRelation, index) => (
          <CategoriesTableRow key={categoryRelation.id} index={index}>
            <CategoriesTableCell>
              {editable ? (
                <SelectField
                  disabled={false}
                  value={categoryRelation?.category?.id ?? 'Select a category'}
                  onChange={(e) =>
                    setCategoryRelation(index, {
                      ...categoryRelation,
                      category: categories?.find(
                        (_category) => _category?.id == e.target.value
                      )!,
                    })
                  }
                >
                  <MenuItem value='Select a category'>
                    Select a category
                  </MenuItem>
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category?.name}
                    </MenuItem>
                  ))}
                </SelectField>
              ) : (
                <Typography fontSize={14}>
                  {categoryRelation.category?.name}
                </Typography>
              )}
            </CategoriesTableCell>
            <CategoriesTableCell>
              {editable ? (
                <Checkbox
                  checked={categoryRelation.is_percentage}
                  onChange={(e, checked) =>
                    setCategoryRelation(index, {
                      ...categoryRelation,
                      is_percentage: checked,
                    })
                  }
                  style={{ color: Colors.DARK_GREEN }}
                />
              ) : (
                `${
                  categoryRelation.is_percentage
                    ? categoryRelation.amount
                    : Math.round(
                        (100 * parseFloat(categoryRelation.amount)) /
                          parseFloat(budget.income)
                      )
                }%`
              )}
            </CategoriesTableCell>
            {editable ? (
              <CategoriesTableCell>
                <Typography fontSize={14}>
                  {getTypicalAmount(categoryRelation)}
                </Typography>
              </CategoriesTableCell>
            ) : null}
            <CategoriesTableCell>
              {editable ? (
                <AuthInput
                  value={categoryRelation.amount}
                  onChange={(e) =>
                    setCategoryRelation(index, {
                      ...categoryRelation,
                      amount: e.target.value,
                    })
                  }
                />
              ) : (
                `$${
                  categoryRelation.is_percentage
                    ? Math.round(
                        (parseFloat(categoryRelation.amount) *
                          parseFloat(budget.income)) /
                          100
                      )
                    : categoryRelation.amount
                }`
              )}
            </CategoriesTableCell>
            {editable ? (
              <CategoriesTableCell>
                <IconButton onClick={() => removeRow(index)}>
                  <Remove style={{ color: Colors.RED }} />
                </IconButton>
              </CategoriesTableCell>
            ) : null}
          </CategoriesTableRow>
        ))}
        {editable && (
          <CategoriesTableRow index={categoryRelations.length}>
            <CategoriesTableCell>
              <Typography fontSize={14} fontWeight={600}>
                Total
              </Typography>
            </CategoriesTableCell>
            <CategoriesTableCell>
              <Typography fontSize={14}>
                {categoryRelations.reduce(
                  (prevSum, categoryRelation) =>
                    prevSum +
                    (categoryRelation.amount
                      ? categoryRelation.is_percentage
                        ? parseFloat(categoryRelation.amount)
                        : Math.round(
                            (100 * parseFloat(categoryRelation.amount)) /
                              parseFloat(budget.income)
                          )
                      : 0),
                  0
                )}
                %
              </Typography>
            </CategoriesTableCell>
            <CategoriesTableCell />
            <CategoriesTableCell />
            <CategoriesTableCell>
              <IconButton onClick={addRow}>
                <Add style={{ color: Colors.DARK_GREEN }} />
              </IconButton>
            </CategoriesTableCell>
          </CategoriesTableRow>
        )}
      </TableBody>
    </Table>
  );
};
