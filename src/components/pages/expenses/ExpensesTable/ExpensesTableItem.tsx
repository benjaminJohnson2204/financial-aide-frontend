import { ExpenseResponse } from '@/api-client';
import { ExpensesTableCell, ExpensesTableRow } from './styles';
import { IconButton, Typography, useMediaQuery } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { ViewExpensePopup } from '@/components/popups/expenses/ViewExpensePopup';
import { ConfirmDeleteExpensePopup } from '@/components/popups/expenses/ConfirmDeleteExpensePopup';
import { Delete, Edit } from '@mui/icons-material';
import { Colors } from '@/constants/colors';
import { EditExpensePopup } from '@/components/popups/expenses/EditExpensePopup';

interface ExpensesTableItemProps {
  expense: ExpenseResponse;
  index: number;
  afterSave: () => unknown;
  afterDelete: () => unknown;
}

export const ExpensesTableItem = ({
  expense,
  index,
  afterSave,
  afterDelete,
}: ExpensesTableItemProps) => {
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [confirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const isTinyMobile = useMediaQuery('@media screen and (max-width: 600px)');

  const openViewPopup = () => setViewPopupOpen(true);

  return (
    <>
      <ExpensesTableRow index={index}>
        <ExpensesTableCell onClick={openViewPopup}>
          <Typography fontSize={14}>
            {moment(expense.timestamp).format('MM/DD/YY')}
          </Typography>
        </ExpensesTableCell>
        <ExpensesTableCell onClick={openViewPopup}>
          <Typography fontSize={14}>
            {moment(expense.timestamp).format('hh:mm')}
          </Typography>
        </ExpensesTableCell>
        <ExpensesTableCell onClick={openViewPopup}>
          <Typography fontSize={14}>{expense.name}</Typography>
        </ExpensesTableCell>
        <ExpensesTableCell onClick={openViewPopup}>
          <Typography fontSize={14}>{expense.amount}</Typography>
        </ExpensesTableCell>
        <ExpensesTableCell onClick={openViewPopup}>
          <Typography fontSize={14}>{expense.category?.name}</Typography>
        </ExpensesTableCell>
        {isTinyMobile ? null : (
          <ExpensesTableCell onClick={openViewPopup}>
            <Typography fontSize={14}>{expense.description}</Typography>
          </ExpensesTableCell>
        )}
        <ExpensesTableCell>
          <IconButton onClick={() => setEditPopupOpen(true)}>
            <Edit fontSize='medium' style={{ color: Colors.DARK_GREEN }} />
          </IconButton>
          <IconButton onClick={() => setConfirmDeletePopupOpen(true)}>
            <Delete fontSize='medium' style={{ color: Colors.RED }} />
          </IconButton>
        </ExpensesTableCell>
      </ExpensesTableRow>

      <ViewExpensePopup
        expense={expense}
        isOpen={viewPopupOpen}
        onClose={() => setViewPopupOpen(false)}
        onOpenEdit={() => {
          setViewPopupOpen(false);
          setEditPopupOpen(true);
        }}
        onOpenConfirmDelete={() => {
          setViewPopupOpen(false);
          setConfirmDeletePopupOpen(true);
        }}
      />
      <EditExpensePopup
        expense={expense}
        isOpen={editPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        afterSave={afterSave}
        onOpenView={() => {
          setEditPopupOpen(false);
          setViewPopupOpen(true);
        }}
        onOpenConfirmDelete={() => {
          setEditPopupOpen(false);
          setConfirmDeletePopupOpen(true);
        }}
      />
      <ConfirmDeleteExpensePopup
        expense={expense}
        isOpen={confirmDeletePopupOpen}
        onClose={() => setConfirmDeletePopupOpen(false)}
        afterDelete={afterDelete}
      />
    </>
  );
};
