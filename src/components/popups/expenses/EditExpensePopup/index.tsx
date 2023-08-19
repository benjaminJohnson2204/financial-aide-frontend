import { ExpenseResponse, ExpensesApiAxiosParamCreator } from '@/api-client';
import { useEffect, useState } from 'react';
import { BasePopup } from '../../BasePopup';
import { Grid, MenuItem } from '@mui/material';
import { CustomInputField } from '@/components/inputs/InputField';
import {
  ThreeButtonsInnerRow,
  ThreeButtonsOuterRow,
} from '@/components/buttonRows/styles';
import { CustomButton } from '@/components/buttons/CustomButton';
import { Colors } from '@/constants/colors';
import moment from 'moment';
import { Delete, Save, Visibility } from '@mui/icons-material';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { toast } from 'react-toastify';
import { useCategories } from '@/utils/backendAPI/categories';

interface EditExpensePopupProps {
  expense: ExpenseResponse;
  isOpen: boolean;
  onClose: () => unknown;
  afterSave: () => unknown;
  onOpenView: () => unknown;
  onOpenConfirmDelete: () => unknown;
}

export const EditExpensePopup = ({
  expense,
  isOpen,
  onClose,
  afterSave,
  onOpenView,
  onOpenConfirmDelete,
}: EditExpensePopupProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    expense.category?.id
  );

  useEffect(() => {
    setSelectedCategoryId(expense.category?.id);
  }, [expense.category?.id]);

  const { categories } = useCategories();

  const expensesClient = ExpensesApiAxiosParamCreator();

  const save = () => {
    if (submitting) return;
    const form = document.getElementById(
      'edit-expense-form'
    ) as HTMLFormElement;
    if (!form || !form._name) {
      return;
    }
    const name = form._name.value;
    const amount = form.amount.value;
    const description = form.description.value;
    const date = form.date.value;
    const time = form.time.value;
    const timestamp = new Date(Date.parse(`${date} ${time}`));

    const expensePatchData = {
      name,
      amount,
      category: selectedCategoryId,
      timestamp,
    };
    if (description && description.length > 0) {
      (expensePatchData as any).description = description;
    }

    setSubmitting(true);

    expensesClient
      .apiExpensesExpensesPartialUpdate(expense.id, expensePatchData)
      .then(({ url, options }) =>
        backendClient.patch(url, expensePatchData, options).then((response) => {
          toast.success('Saved expense successfully');
          afterSave();
          onClose();
        })
      )
      .catch((error) => {
        toast.error('Error entering expense');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <BasePopup isOpen={isOpen} onClose={onClose} title={`Edit Budget`}>
        <form id='edit-expense-form'>
          <Grid container spacing={4} padding={2}>
            <CustomInputField
              editable
              inputType='text'
              label='Name'
              name='_name'
              defaultValue={expense.name}
            />
            <CustomInputField
              editable
              inputType='text'
              label='Amount ($)'
              name='amount'
              defaultValue={expense.amount}
            />
            <CustomInputField
              editable
              inputType='select'
              label='Category'
              name='category'
              selectContents={
                categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category?.name}
                  </MenuItem>
                )) ?? []
              }
              onChange={setSelectedCategoryId}
              defaultValue={expense.category.id.toString()}
            />
            <CustomInputField
              editable
              inputType='text'
              label='Description'
              multiline
              name='description'
              defaultValue={expense.description}
            />
            <CustomInputField
              editable
              inputType='date'
              label='Date'
              name='date'
              defaultValue={moment(expense.timestamp).format('YYYY-MM-DD')}
            />
            <CustomInputField
              editable
              inputType='time'
              label='Time'
              name='time'
              defaultValue={moment(expense.timestamp).format('hh:mm')}
            />
          </Grid>
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
