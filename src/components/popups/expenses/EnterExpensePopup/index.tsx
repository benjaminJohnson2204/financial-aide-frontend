import {
  ExpenseCreationRequest,
  ExpensesApiAxiosParamCreator,
} from '@/api-client';
import { useCategories } from '@/utils/backendAPI/categories';
import { useState } from 'react';
import { BasePopup } from '../../BasePopup';
import { Grid, MenuItem } from '@mui/material';
import { CustomInputField } from '@/components/inputs/InputField';
import { TwoButtonsOppositeRow } from '@/components/buttonRows/styles';
import { CustomButton } from '@/components/buttons/CustomButton';
import { Colors } from '@/constants/colors';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { toast } from 'react-toastify';

interface EnterExpensePopupProps {
  isOpen: boolean;
  onClose: () => unknown;
  afterCreate: () => unknown;
}

export const EnterExpensePopup = ({
  isOpen,
  onClose,
  afterCreate,
}: EnterExpensePopupProps) => {
  const [submitting, setSubmitting] = useState(false);
  const { categories } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>(
    'Select a category'
  );

  const expensesClient = ExpensesApiAxiosParamCreator();

  const create = () => {
    if (submitting) return;
    const form = document.getElementById(
      'enter-expense-form'
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

    const expensePostData = {
      name,
      amount,
      category: selectedCategoryId as number,
      timestamp,
    };
    if (description && description.length > 0) {
      (expensePostData as any).description = description;
    }

    setSubmitting(true);

    expensesClient
      .apiExpensesExpensesCreate(expensePostData as ExpenseCreationRequest)
      .then(({ url, options }) =>
        backendClient.post(url, expensePostData, options).then((response) => {
          toast.success('Entered expense successfully');
          afterCreate();
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
    <BasePopup isOpen={isOpen} onClose={onClose} title='Enter Expense'>
      <form id='enter-expense-form'>
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
            label='Amount ($)'
            name='amount'
          />
          <CustomInputField
            editable
            inputType='select'
            label='Category'
            name='category'
            selectContents={[
              <MenuItem key='Select a category' value='Select a category'>
                Select a category
              </MenuItem>,
              ...(categories?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category?.name}
                </MenuItem>
              )) ?? []),
            ]}
            onChange={setSelectedCategoryId}
            defaultValue={selectedCategoryId?.toString()}
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
            label='Date'
            name='date'
          />
          <CustomInputField
            editable
            inputType='time'
            label='Time'
            name='time'
          />
        </Grid>
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
