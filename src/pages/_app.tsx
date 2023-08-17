import { MainLayout } from '@/components/layout/MainLayout';
import { AuthContextProvider } from '@/contexts/authContext';
import { useSetCsrfTokenHeader } from '@/utils/backendAPI/csrfToken';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {
  useSetCsrfTokenHeader();

  return (
    <>
      <AuthContextProvider>
        <MainLayout page={<Component {...pageProps} />} />
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
};

export default App;
