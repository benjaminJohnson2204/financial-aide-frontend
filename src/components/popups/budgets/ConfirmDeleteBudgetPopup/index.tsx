import {
  BudgetCategoryRelationResponse,
  BudgetCategoryResponse,
  BudgetsApiAxiosParamCreator,
} from '@/api-client';
import { BasePopup } from '../../BasePopup';
import { Colors } from '@/constants/colors';
import { Box, Typography } from '@mui/material';
import { TwoButtonsOppositeRow } from '@/components/buttonRows/styles';
import { CustomButton } from '@/components/buttons/CustomButton';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { toast } from 'react-toastify';

interface ConfirmDeleteBudgetPopupProps {
  budget: BudgetCategoryResponse;
  isOpen: boolean;
  onClose: () => unknown;
  afterDelete: () => unknown;
}

export const ConfirmDeleteBudgetPopup = ({
  budget,
  isOpen,
  onClose,
  afterDelete,
}: ConfirmDeleteBudgetPopupProps) => {
  const budgetsClient = BudgetsApiAxiosParamCreator();
  const deleteBudget = () => {
    budgetsClient
      .apiBudgetsBudgetsDestroy(budget.id)
      .then(({ url, options }) =>
        backendClient.delete(url, options).then((response) => {
          toast.success('Deleted budget successfully');
          afterDelete();
          onClose();
        })
      )
      .catch((error) => {
        toast.error('Error deleting budget');
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
          {`Are you sure you want to delete the budget "${budget.name}"?`}
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
            onClick={deleteBudget}
          >
            Confirm
          </CustomButton>
        </Box>
      </>
    </BasePopup>
  );
};
