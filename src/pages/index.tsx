import { PageTitle } from '@/components/layout/PageTitle';
import { LandingPage } from '@/components/pages/LandingPage';
import Image from 'next/image';

const Landing = () => {
  return (
    <>
      <PageTitle title='Landing' />
      <LandingPage />
    </>
  );
};

export default Landing;
