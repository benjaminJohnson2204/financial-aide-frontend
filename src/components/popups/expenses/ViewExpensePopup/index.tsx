import { ExpenseResponse } from '@/api-client';
import { BasePopup } from '../../BasePopup';
import { Grid, MenuItem } from '@mui/material';
import { CustomInputField } from '@/components/inputs/InputField';
import moment from 'moment';
import { TwoButtonsOppositeRow } from '@/components/buttonRows/styles';
import { CustomButton } from '@/components/buttons/CustomButton';
import { Colors } from '@/constants/colors';
import { Delete, Edit } from '@mui/icons-material';

interface ViewExpensePopupProps {
  expense: ExpenseResponse;
  isOpen: boolean;
  onClose: () => unknown;
  onOpenEdit: () => unknown;
  onOpenConfirmDelete: () => unknown;
}

export const ViewExpensePopup = ({
  expense,
  isOpen,
  onClose,
  onOpenEdit,
  onOpenConfirmDelete,
}: ViewExpensePopupProps) => {
  return (
    <>
      <BasePopup
        isOpen={isOpen}
        onClose={onClose}
        title={expense.name ?? 'Edit expense'}
      >
        <>
          <Grid container spacing={4} padding={2}>
            <CustomInputField
              editable={false}
              inputType='text'
              label='Name'
              name='_name'
              defaultValue={expense.name}
            />
            <CustomInputField
              editable={false}
              inputType='text'
              label='Amount ($)'
              name='amount'
              defaultValue={expense.amount}
            />
            <CustomInputField
              editable={false}
              inputType='select'
              label='Category'
              name='category'
              selectContents={[
                <MenuItem key={expense.category.id} value={expense.category.id}>
                  {expense.category.name}
                </MenuItem>,
              ]}
              defaultValue={expense.category.id.toString()}
            />
            <CustomInputField
              editable={false}
              inputType='text'
              label='Description'
              multiline
              name='description'
              defaultValue={expense.description}
            />
            <CustomInputField
              editable={false}
              inputType='date'
              label='Date'
              name='date'
              defaultValue={moment(expense.timestamp).format('YYYY-MM-DD')}
            />
            <CustomInputField
              editable={false}
              inputType='time'
              label='Time'
              name='time'
              defaultValue={moment(expense.timestamp).format('hh:mm')}
            />
          </Grid>
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
