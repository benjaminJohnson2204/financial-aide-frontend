import { ExpenseResponse, ExpensesApiAxiosParamCreator } from '@/api-client';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { toast } from 'react-toastify';
import { BasePopup } from '../../BasePopup';
import { Colors } from '@/constants/colors';
import { Box, Typography } from '@mui/material';
import { CustomButton } from '@/components/buttons/CustomButton';

interface ConfirmDeleteExpensePopupProps {
  expense: ExpenseResponse;
  isOpen: boolean;
  onClose: () => unknown;
  afterDelete: () => unknown;
}

export const ConfirmDeleteExpensePopup = ({
  expense,
  isOpen,
  onClose,
  afterDelete,
}: ConfirmDeleteExpensePopupProps) => {
  const expensesClient = ExpensesApiAxiosParamCreator();
  const deleteExpense = () => {
    expensesClient
      .apiExpensesExpensesDestroy(expense.id)
      .then(({ url, options }) =>
        backendClient.delete(url, options).then((response) => {
          toast.success('Deleted expense successfully');
          afterDelete();
          onClose();
        })
      )
      .catch((error) => {
        toast.error('Error deleting expense');
      });
  };

  return (
    <BasePopup
      isOpen={isOpen}
      onClose={onClose}
      title='Are You Sure?'
      titleColor={Colors.RED}
    >
      <>
        <Typography fontSize={18}>
          {`Are you sure you want to delete the expense "${expense.name}"?`}
        </Typography>
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='end'
          alignItems='center'
          gap={2}
          position='absolute'
          bottom={20}
          right={20}
        >
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
            primaryColor={Colors.RED}
            secondaryColor={Colors.WHITE}
            onClick={deleteExpense}
          >
            Confirm
          </CustomButton>
        </Box>
      </>
    </BasePopup>
  );
};
