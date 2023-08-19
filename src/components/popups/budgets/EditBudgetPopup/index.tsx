import {
  BudgetCategoryRelationResponse,
  BudgetCategoryRelationsApiAxiosParamCreator,
  BudgetCategoryResponse,
  BudgetResponse,
  BudgetsApiAxiosParamCreator,
  IntervalEnum,
  PatchedBudgetCreationRequest,
} from '@/api-client';
import { BasePopup } from '../../BasePopup';
import { Delete, Edit, Save, Visibility } from '@mui/icons-material';
import { Box, Grid, MenuItem, Typography } from '@mui/material';
import { AuthInput } from '@/components/pages/auth/common/styles';
import { Colors } from '@/constants/colors';
import { CategoriesTable } from '@/components/pages/budgets/CategoriesTable';
import {
  ThreeButtonsInnerRow,
  ThreeButtonsOuterRow,
  TwoButtonsOppositeRow,
} from '@/components/buttonRows/styles';
import { CustomButton } from '@/components/buttons/CustomButton';
import { useEffect, useState } from 'react';
import { ConfirmDeleteBudgetPopup } from '../ConfirmDeleteBudgetPopup';
import { CustomInputField } from '../../../inputs/InputField';
import { capitalizeString } from '@/utils/formatting';
import moment from 'moment';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { toast } from 'react-toastify';

interface EditBudgetPopupProps {
  budget: BudgetResponse;
  initialCategoryRelations: BudgetCategoryRelationResponse[];
  isOpen: boolean;
  onClose: () => unknown;
  afterSave: () => unknown;
  onOpenView: () => unknown;
  onOpenConfirmDelete: () => unknown;
}

export const EditBudgetPopup = ({
  budget,
  initialCategoryRelations,
  isOpen,
  onClose,
  afterSave,
  onOpenView,
  onOpenConfirmDelete,
}: EditBudgetPopupProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [categoryRelations, setCategoryRelations] = useState<
    BudgetCategoryRelationResponse[]
  >(initialCategoryRelations);
  const [frequency, setFrequency] = useState<IntervalEnum | 'Select an option'>(
    'Select an option'
  );

  useEffect(() => {
    setFrequency(budget.interval);
  }, [budget.interval]);

  useEffect(() => {
    setCategoryRelations(initialCategoryRelations);
  }, [initialCategoryRelations]);

  const budgetsClient = BudgetsApiAxiosParamCreator();
  const categoryRelationsClient = BudgetCategoryRelationsApiAxiosParamCreator();

  const save = () => {
    const form = document.getElementById('edit-budget-form') as HTMLFormElement;
    const name = form._name.value;
    const description = form.description.value;
    const start_time = form.start_time.value;
    const end_time = form.end_time.value;
    const income = form.income.value;
    const interval = frequency;

    const budgetPatchData = {
      name,
      description,
      start_time,
      end_time,
      income,
      interval,
    };

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
      .apiBudgetsBudgetsPartialUpdate(
        budget.id,
        budgetPatchData as PatchedBudgetCreationRequest
      )
      .then(({ url, options }) => {
        backendClient
          .patch(url, budgetPatchData, options)
          .then((response) =>
            categoryRelationsClient
              .apiBudgetsBudgetsCategoryRelationsBulkUpdatePartialUpdate(
                budget.id,
                categoryRelationsPatchData
              )
              .then(({ url, options }) =>
                backendClient
                  .patch(url, categoryRelationsPatchData, options)
                  .then((response) => {
                    toast.success('Saved successfully!');
                    afterSave();
                    onClose();
                  })
              )
          )
          .catch((error) => {
            toast.error('Error saving');
          })
          .finally(() => {
            setSubmitting(false);
          });
      });
  };

  return (
    <>
      <BasePopup isOpen={isOpen} onClose={onClose} title={`Edit Budget`}>
        <form id='edit-budget-form'>
          <Grid container spacing={4} padding={2}>
            <CustomInputField
              editable
              inputType='text'
              label='Name'
              name='_name'
              defaultValue={budget.name}
            />
            <CustomInputField
              editable
              inputType='text'
              label='Description'
              multiline
              name='description'
              defaultValue={budget.description}
            />
            <CustomInputField
              editable
              inputType='date'
              label='Start'
              name='start_time'
              defaultValue={moment(budget.start_time).format('YYYY-MM-DD')}
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
              defaultValue={moment(budget.end_time).format('YYYY-MM-DD')}
            />
            <CustomInputField
              editable
              inputType='text'
              label='Income ($)'
              name='income'
              defaultValue={budget.income}
            />
          </Grid>
          <Typography margin={3} fontSize={18} fontWeight={600}>
            Expense Categories
          </Typography>
          <CategoriesTable
            budget={budget}
            editable
            categoryRelations={categoryRelations}
            onChangeCategoryRelations={setCategoryRelations}
          />
          <ThreeButtonsOuterRow>
            <CustomButton
              variant='contained'
              primaryColor={Colors.RED}
              secondaryColor={Colors.WHITE}
              onClick={onOpenConfirmDelete}
            >
              <Delete />
              Delete
            </CustomButton>

            <ThreeButtonsInnerRow>
              <CustomButton
                variant='outlined'
                primaryColor={Colors.DARK_PURPLE}
                secondaryColor={Colors.WHITE}
                onClick={onOpenView}
              >
                <Visibility />
                View
              </CustomButton>
              <CustomButton
                variant='contained'
                primaryColor={Colors.DARK_GREEN}
                secondaryColor={Colors.WHITE}
                onClick={save}
                disabled={submitting}
              >
                <Save />
                Save
              </CustomButton>
            </ThreeButtonsInnerRow>
          </ThreeButtonsOuterRow>
        </form>
      </BasePopup>
    </>
  );
};
