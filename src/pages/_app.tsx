import { MainLayout } from '@/components/layout/MainLayout';
import { theme } from '@/constants/theme';
import { AuthContextProvider } from '@/contexts/authContext';
import { useSetCsrfTokenHeader } from '@/utils/backendAPI/csrfToken';
import { ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {
  useSetCsrfTokenHeader();

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <MainLayout page={<Component {...pageProps} />} />
        </AuthContextProvider>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};

export default App;
