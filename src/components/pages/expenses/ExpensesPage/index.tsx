import { useExpenses } from '@/utils/backendAPI/expenses';
import { useState } from 'react';
import { ExpensesTopRow } from './styles';
import { Colors } from '@/constants/colors';
import { Typography } from '@mui/material';
import { CustomButton } from '@/components/buttons/CustomButton';
import { ExpensesTable } from '../ExpensesTable';
import { EnterExpensePopup } from '@/components/popups/expenses/EnterExpensePopup';
import { useRedirect } from '@/utils/redirect';
import { Download } from '@mui/icons-material';
import { ExpensesApiAxiosParamCreator } from '@/api-client';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { toast } from 'react-toastify';

export const ExpensesPage = () => {
  const [enterExpensePopupOpen, setEnterExpensePopupOpen] = useState(false);

  const {
    expenses: allExpenses,
    loadingExpenses,
    refreshExpenses,
  } = useExpenses();

  useRedirect(true);

  const [downloading, setDownloading] = useState(false);
  const expensesClient = ExpensesApiAxiosParamCreator();
  const downloadExpenses = () => {
    setDownloading(true);
    expensesClient
      .apiExpensesExpensesCsvExportList()
      .then(({ url, options }) =>
        backendClient.get(url, options).then((response) => {
          const link = document.createElement('a');
          const blob = new Blob([response.data], {
            type: 'text/csv',
          });
          const fileUrl = window.URL.createObjectURL(blob);
          link.href = fileUrl;
          link.download = 'expenses.csv';
          document.body.append(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(fileUrl);
        })
      )
      .catch((error) => {
        toast.error('Unable to download expenses');
      })
      .finally(() => setDownloading(false));
  };

  return (
    <>
      <ExpensesTopRow>
        <Typography fontSize={36} fontWeight={600} color={Colors.DARK_PURPLE}>
          Your Expenses
        </Typography>
        <CustomButton
          variant='outlined'
          primaryColor={Colors.DARK_GREEN}
          secondaryColor={Colors.WHITE}
          onClick={() => setEnterExpensePopupOpen(true)}
        >
          Enter Expense
        </CustomButton>
        <CustomButton
          disabled={downloading}
          variant='contained'
          primaryColor={Colors.DARK_PURPLE}
          secondaryColor={Colors.WHITE}
          onClick={downloadExpenses}
          style={{
            width: 200,
          }}
        >
          <Download />
          Download as CSV
        </CustomButton>
      </ExpensesTopRow>
      <ExpensesTable
        allExpenses={allExpenses}
        afterSave={refreshExpenses}
        afterDelete={refreshExpenses}
      />
      <EnterExpensePopup
        isOpen={enterExpensePopupOpen}
        onClose={() => setEnterExpensePopupOpen(false)}
        afterCreate={refreshExpenses}
      />
    </>
  );
};
