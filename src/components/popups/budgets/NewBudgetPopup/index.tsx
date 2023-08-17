import { Box, Grid, MenuItem, Typography } from '@mui/material';
import { BasePopup } from '../../BasePopup';
import { AuthInput } from '@/components/pages/auth/common/styles';
import { useCallback, useMemo, useState } from 'react';
import {
  BudgetCategoryRelationResponse,
  BudgetCategoryRelationsApiAxiosParamCreator,
  BudgetCreationRequest,
  BudgetResponse,
  BudgetsApiAxiosParamCreator,
  IntervalEnum,
} from '@/api-client';
import { CategoriesTable } from '@/components/pages/budgets/CategoriesTable';
import { CustomInputField } from '../../../inputs/InputField';
import { TwoButtonsOppositeRow } from '@/components/buttonRows/styles';
import { CustomButton } from '@/components/buttons/CustomButton';
import { Colors } from '@/constants/colors';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { capitalizeString } from '@/utils/formatting';
import { toast } from 'react-toastify';

interface NewBudgetPopupProps {
  isOpen: boolean;
  onClose: () => unknown;
  afterCreate: () => unknown;
}

export const NewBudgetPopup = ({
  isOpen,
  onClose,
  afterCreate,
}: NewBudgetPopupProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [categoryRelations, setCategoryRelations] = useState<
    BudgetCategoryRelationResponse[]
  >([]);
  const [frequency, setFrequency] = useState<IntervalEnum | 'Select an option'>(
    'Select an option'
  );

  const budgetsClient = BudgetsApiAxiosParamCreator();
  const categoryRelationsClient = BudgetCategoryRelationsApiAxiosParamCreator();

  const getBudgetFromForm = useCallback(() => {
    if (typeof document !== 'undefined') {
      const form = document.getElementById(
        'new-budget-form'
      ) as HTMLFormElement;
      if (!form || !form._name) {
        return;
      }
      const name = form._name.value;
      const description = form.description.value;
      const start_time = form.start_time.value;
      const end_time = form.end_time.value;
      const income = form.income.value;
      const interval = frequency;

      return {
        name,
        description,
        start_time,
        end_time,
        income,
        interval,
      };
    }
  }, []);

  const create = () => {
    if (submitting) return;
    const budgetPostData = getBudgetFromForm();

    if (!budgetPostData) return;

    const categoryRelationsPatchData = {
      category_relations: categoryRelations.map((categoryRelation) => ({
        category: categoryRelation.category.id,
        amount: categoryRelation.amount,
        is_percentage: categoryRelation.is_percentage,
        id: categoryRelation.id,
      })),
    };

    setSubmitting(true);

    budgetsClient
      .apiBudgetsBudgetsCreate(budgetPostData as BudgetCreationRequest)
      .then(({ url, options }) => {
        backendClient
          .post(url, budgetPostData, options)
          .then((response) => {
            categoryRelationsClient
              .apiBudgetsBudgetsCategoryRelationsBulkUpdatePartialUpdate(
                response.data.id,
                categoryRelationsPatchData
              )
              .then(({ url, options }) => {
                backendClient
                  .patch(url, categoryRelationsPatchData, options)
                  .then((response) => {
                    toast.success('Created budget!');
                    afterCreate();
                    onClose();
                  });
              });
          })
          .catch((error) => {
            toast.error('Error creating budget');
          })
          .finally(() => {
            setSubmitting(false);
          });
      });
  };

  return (
    <BasePopup isOpen={isOpen} onClose={onClose} title='New Budget'>
      <form id='new-budget-form'>
        <Grid container spacing={2} padding={1}>
          <CustomInputField
            editable
            inputType='text'
            label='Name'
            name='_name'
          />
          <CustomInputField
            editable
            inputType='text'
            label='Description'
            multiline
            name='description'
          />
          <CustomInputField
            editable
            inputType='date'
            label='Start'
            name='start_time'
          />
          <CustomInputField
            editable
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
            editable
            inputType='date'
            label='End'
            name='end_time'
          />
          <CustomInputField
            editable
            inputType='text'
            label='Income ($)'
            multiline
            name='income'
          />
        </Grid>
        <Typography margin={3} fontSize={18} fontWeight={600}>
          Expense Categories
        </Typography>
        <CategoriesTable
          budget={getBudgetFromForm() as BudgetResponse}
          editable
          categoryRelations={categoryRelations}
          onChangeCategoryRelations={setCategoryRelations}
        />
        <TwoButtonsOppositeRow>
          <CustomButton
            variant='outlined'
            primaryColor={Colors.RED}
            secondaryColor={Colors.WHITE}
            onClick={onClose}
          >
            Cancel
          </CustomButton>
          <CustomButton
            variant='contained'
            primaryColor={Colors.DARK_GREEN}
            secondaryColor={Colors.WHITE}
            onClick={create}
            disabled={submitting}
          >
            Create
          </CustomButton>
        </TwoButtonsOppositeRow>
      </form>
    </BasePopup>
  );
};
