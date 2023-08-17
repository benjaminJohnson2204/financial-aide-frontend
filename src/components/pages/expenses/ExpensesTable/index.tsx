import { BudgetCategoryResponse, ExpenseResponse } from '@/api-client';
import {
  Box,
  CircularProgress,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  debounce,
} from '@mui/material';
import { ExpensesTableItem } from './ExpensesTableItem';
import { useExpenses } from '@/utils/backendAPI/expenses';
import { useEffect, useMemo, useState } from 'react';
import { PAGE_SIZE } from '@/constants/pagination';
import {
  ExpensesHeaderCellContents,
  ExpensesTableCell,
  OrderingArrowButton,
  PaginationContainer,
  StyledPagination,
} from './styles';
import { Colors } from '@/constants/colors';
import { CustomInputField } from '@/components/inputs/InputField';
import {
  ArrowDropDown,
  ArrowDropUp,
  Filter,
  FilterAlt,
} from '@mui/icons-material';
import { FilterPopup } from '@/components/popups/FilterPopup';
import { useCategories } from '@/utils/backendAPI/categories';
import { DateRangeFilterPopup } from '@/components/popups/DateRangePopup';

interface ExpensesTableProps {
  allExpenses?: ExpenseResponse[];
  afterSave: () => unknown;
  afterDelete: () => unknown;
}

export const ExpensesTable = ({
  allExpenses,
  afterSave,
  afterDelete,
}: ExpensesTableProps) => {
  const { categories } = useCategories();
  const [selectedCategories, setSelectedCategories] =
    useState<BudgetCategoryResponse[]>();
  const [ordering, setOrdering] = useState<string>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>();
  const [minTimestamp, setMinTimestamp] = useState<Date>();
  const [maxTimestamp, setMaxTimestamp] = useState<Date>();
  const selectedCategoryIds = useMemo(
    () => selectedCategories?.map((category) => category.id),
    [selectedCategories]
  );
  const { expenses, expensesCount, loadingExpenses, refreshExpenses } =
    useExpenses({
      categoryIdIn: selectedCategoryIds,
      minTimestamp,
      maxTimestamp,
      ordering,
      page,
      search,
    });
  const [categoryPopoverAnchor, setCategoryPopoverAnchor] =
    useState<HTMLElement | null>(null);
  const [datePopoverAnchor, setDatePopoverAnchor] =
    useState<HTMLElement | null>(null);

  const updateSearchInput = debounce((e: any) => {
    setSearch(e.target.value);
  }, 500);

  useEffect(() => {
    const searchField = document.getElementById(
      'expenses-search-input'
    ) as HTMLInputElement;
    searchField?.addEventListener('input', updateSearchInput);
    return () => searchField?.removeEventListener('input', updateSearchInput);
  }, [setSearch]);

  const renderOrderingArrows = (fieldName: string) => {
    return (
      <Box display='flex' flexDirection='column' gap={1}>
        <OrderingArrowButton onClick={() => setOrdering(fieldName)}>
          <ArrowDropUp
            fontSize='large'
            style={{
              color: ordering === fieldName ? Colors.DARK_GREEN : undefined,
            }}
          />
        </OrderingArrowButton>
        <OrderingArrowButton onClick={() => setOrdering(`-${fieldName}`)}>
          <ArrowDropDown
            fontSize='large'
            style={{
              color:
                ordering === `-${fieldName}` ? Colors.DARK_GREEN : undefined,
            }}
          />
        </OrderingArrowButton>
      </Box>
    );
  };

  return (
    <>
      <CustomInputField
        id='expenses-search-input'
        inputType='text'
        editable
        label='Search'
        name='expenses-search-input'
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <ExpensesHeaderCellContents>
                <Typography fontSize={14} fontWeight={600}>
                  Date
                </Typography>
                <OrderingArrowButton
                  onClick={(e) =>
                    setDatePopoverAnchor(
                      datePopoverAnchor === null ? e.currentTarget : null
                    )
                  }
                >
                  <FilterAlt
                    style={{
                      color:
                        minTimestamp || maxTimestamp
                          ? Colors.DARK_GREEN
                          : undefined,
                    }}
                  />
                </OrderingArrowButton>
                {renderOrderingArrows('timestamp')}
              </ExpensesHeaderCellContents>
            </TableCell>
            <TableCell>
              <ExpensesHeaderCellContents>
                <Typography fontSize={14} fontWeight={600}>
                  Time
                </Typography>
              </ExpensesHeaderCellContents>
            </TableCell>
            <TableCell>
              <ExpensesHeaderCellContents>
                <Typography fontSize={14} fontWeight={600}>
                  Name
                </Typography>
                {renderOrderingArrows('name')}
              </ExpensesHeaderCellContents>
            </TableCell>
            <TableCell>
              <ExpensesHeaderCellContents>
                <Typography fontSize={14} fontWeight={600}>
                  Amount
                </Typography>
                {renderOrderingArrows('amount')}
              </ExpensesHeaderCellContents>
            </TableCell>
            <TableCell>
              <ExpensesHeaderCellContents>
                <Typography fontSize={14} fontWeight={600}>
                  Category
                </Typography>
                <OrderingArrowButton
                  onClick={(e) =>
                    setCategoryPopoverAnchor(
                      categoryPopoverAnchor === null ? e.currentTarget : null
                    )
                  }
                >
                  <FilterAlt
                    style={{
                      color: selectedCategoryIds?.length
                        ? Colors.DARK_GREEN
                        : undefined,
                    }}
                  />
                </OrderingArrowButton>
                {renderOrderingArrows('category')}
              </ExpensesHeaderCellContents>
            </TableCell>
            <TableCell>
              <ExpensesHeaderCellContents>
                <Typography fontSize={14} fontWeight={600}>
                  Description
                </Typography>
                {renderOrderingArrows('description')}
              </ExpensesHeaderCellContents>
            </TableCell>
            {/* Extra column for edit & delete buttons */}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses?.map((expense, index) => (
            <ExpensesTableItem
              key={expense.id}
              expense={expense}
              index={index}
              afterSave={afterSave}
              afterDelete={afterDelete}
            />
          ))}
        </TableBody>
      </Table>
      {loadingExpenses ? <CircularProgress size={48} /> : null}
      {expenses && expenses.length === 0 ? (
        <Typography fontSize={14} textAlign='center'>
          {allExpenses?.length === 0 ? 'No expenses yet' : 'No results found'}
        </Typography>
      ) : null}
      <PaginationContainer>
        <StyledPagination
          page={page}
          onChange={(e, newPage) => setPage(newPage)}
          count={Math.ceil((expensesCount ?? 1) / PAGE_SIZE)}
        />
      </PaginationContainer>
      <FilterPopup
        title='Filter by category'
        anchor={categoryPopoverAnchor}
        setAnchor={setCategoryPopoverAnchor}
        options={categories ?? []}
        selectedOptions={selectedCategories ?? []}
        onChangeSelectedOptions={setSelectedCategories}
        getOptionLabel={(category) => category.name}
        getOptionValue={(category) => category.id}
      />
      <DateRangeFilterPopup
        title='Filter by date'
        anchor={datePopoverAnchor}
        setAnchor={setDatePopoverAnchor}
        setMinDate={setMinTimestamp}
        setMaxDate={setMaxTimestamp}
      />
    </>
  );
};
