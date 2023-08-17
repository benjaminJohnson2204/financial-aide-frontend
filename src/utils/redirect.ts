import { AuthContext } from '@/contexts/authContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const AUTH_REDIRECT_PATH = '/home';
const UNAUTH_REDIRECT_PATH = '/';

export const useRedirect = (isAuth: boolean) => {
  const { user, loadingUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (loadingUser) {
      return;
    }
    if (isAuth) {
      if (!user) {
        router.push(UNAUTH_REDIRECT_PATH);
      }
    } else {
      if (user) {
        router.push(AUTH_REDIRECT_PATH);
      }
    }
  }, [loadingUser, user]);
};
