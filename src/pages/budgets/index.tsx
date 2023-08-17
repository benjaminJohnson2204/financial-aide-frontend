import { PageTitle } from '@/components/layout/PageTitle';
import { BudgetsPage } from '@/components/pages/budgets/BudgetsPage';

const Budgets = () => {
  return (
    <>
      <PageTitle title='Budgets' /> <BudgetsPage />
    </>
  );
};

export default Budgets;
