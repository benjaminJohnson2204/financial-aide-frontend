import { styled } from '@mui/material';
import { Navbar } from '../Navbar';
import { UserResponse } from '@/api-client';

const ContentRoot = styled('div')({
  marginTop: 85,
  padding: 20,
});

export interface MainLayoutProps {
  page: JSX.Element;
}

export const MainLayout = ({ page }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      <ContentRoot>{page}</ContentRoot>
    </>
  );
};
