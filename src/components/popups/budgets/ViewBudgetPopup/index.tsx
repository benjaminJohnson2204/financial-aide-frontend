import {
  BudgetCategoryRelationResponse,
  BudgetCategoryResponse,
  BudgetResponse,
  IntervalEnum,
} from '@/api-client';
import { BasePopup } from '../../BasePopup';
import { Delete, Edit } from '@mui/icons-material';
import { Box, Grid, MenuItem, Tab, Tabs, Typography } from '@mui/material';
import { AuthInput } from '@/components/pages/auth/common/styles';
import { Colors } from '@/constants/colors';
import { CategoriesTable } from '@/components/pages/budgets/CategoriesTable';
import { TwoButtonsOppositeRow } from '@/components/buttonRows/styles';
import { CustomButton } from '@/components/buttons/CustomButton';
import { useEffect, useState } from 'react';
import { ConfirmDeleteBudgetPopup } from '../ConfirmDeleteBudgetPopup';
import { EditBudgetPopup } from '../EditBudgetPopup';
import { CustomInputField } from '../../../inputs/InputField';
import {
  capitalizeString,
  getCategoryRelationRawAmount,
} from '@/utils/formatting';
import moment from 'moment';
import { CategoriesPieChart } from '@/components/pages/budgets/CategoriesPieChart';
import { StyledTab, StyledTabs } from '@/components/tabs/StyledTabs';

interface ViewBudgetPopupProps {
  budget: BudgetResponse;
  categoryRelations: BudgetCategoryRelationResponse[];
  isOpen: boolean;
  onClose: () => unknown;
  onOpenEdit: () => unknown;
  onOpenConfirmDelete: () => unknown;
}

export const ViewBudgetPopup = ({
  budget,
  categoryRelations,
  isOpen,
  onClose,
  onOpenEdit,
  onOpenConfirmDelete,
}: ViewBudgetPopupProps) => {
  const [frequency, setFrequency] = useState<IntervalEnum | 'Select an option'>(
    'Select an option'
  );
  const [categoriesTab, setCategoriesTab] = useState(0);

  useEffect(() => {
    setFrequency(budget.interval);
  }, [budget.interval]);

  return (
    <>
      <BasePopup isOpen={isOpen} onClose={onClose} title={budget.name}>
        <>
          <Grid container spacing={4} padding={2}>
            <CustomInputField
              editable={false}
              inputType='text'
              label='Name'
              name='_name'
              defaultValue={budget.name?.toString()}
            />
            <CustomInputField
              editable={false}
              inputType='text'
              label='Description'
              name='description'
              defaultValue={budget.description?.toString()}
            />
            <CustomInputField
              editable={false}
              inputType='date'
              label='Start'
              name='start_time'
              defaultValue={moment(budget.start_time).format('YYYY-MM-DD')}
            />
            <CustomInputField
              editable={false}
              inputType='select'
              label='Frequency'
              name='interval'
              selectContents={[
                <MenuItem key='Select an option' value='Select an option'>
                  Select an option
                </MenuItem>,
                ...Object.values(IntervalEnum).map((interval) => (
                  <MenuItem key={interval} value={interval}>
                    {capitalizeString(interval)}
                  </MenuItem>
                )),
              ]}
              onChange={setFrequency}
              defaultValue={frequency}
            />
            <CustomInputField
              editable={false}
              inputType='date'
              label='End'
              name='end_time'
              defaultValue={moment(budget.end_time).format('YYYY-MM-DD')}
            />
            <CustomInputField
              editable={false}
              inputType='text'
              label='Income ($)'
              multiline
              name='income'
              defaultValue={budget.income}
            />
          </Grid>
          <Typography margin={3} fontSize={18} fontWeight={600}>
            Expense Categories
          </Typography>
          <StyledTabs
            value={categoriesTab}
            onChange={(e, value) => setCategoriesTab(value)}
          >
            <StyledTab value={0} label='Table' />
            <StyledTab value={1} label='Pie Chart' />
          </StyledTabs>
          {categoriesTab === 0 ? (
            <CategoriesTable
              budget={budget}
              editable={false}
              categoryRelations={categoryRelations}
            />
          ) : (
            <CategoriesPieChart
              categories={
                categoryRelations.map((categoryRelation) => ({
                  category: categoryRelation.category,
                  rawAmount: getCategoryRelationRawAmount(
                    categoryRelation,
                    parseFloat(budget.income)
                  ),
                })) ?? []
              }
            />
          )}
          <TwoButtonsOppositeRow>
            <CustomButton
              variant='contained'
              primaryColor={Colors.RED}
              secondaryColor={Colors.WHITE}
              onClick={onOpenConfirmDelete}
            >
              <Delete />
              Delete
            </CustomButton>
            <CustomButton
              variant='contained'
              primaryColor={Colors.DARK_PURPLE}
              secondaryColor={Colors.WHITE}
              onClick={onOpenEdit}
            >
              <Edit />
              Edit
            </CustomButton>
          </TwoButtonsOppositeRow>
        </>
      </BasePopup>
    </>
  );
};
