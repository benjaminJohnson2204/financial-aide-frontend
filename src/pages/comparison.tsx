import { PageTitle } from '@/components/layout/PageTitle';
import { ExpectedActualComparisonPage } from '@/components/pages/comparison/ExpectedActualComparisonPage';

const Comparison = () => {
  return (
    <>
      <PageTitle title='Spending Comparison' />
      <ExpectedActualComparisonPage />
    </>
  );
};

export default Comparison;
