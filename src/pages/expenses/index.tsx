import { PageTitle } from '@/components/layout/PageTitle';
import { ExpensesPage } from '@/components/pages/expenses/ExpensesPage';

const Expenses = () => {
  return (
    <>
      <PageTitle title='Expenses' /> <ExpensesPage />
    </>
  );
};

export default Expenses;
