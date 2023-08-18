import Cookies from 'js-cookie';
import { backendClient } from './backendClient';

export const useSetCsrfTokenHeader = () => {
  const setCsrfTokenHeader = (token?: string) => {
    backendClient.defaults.headers.common['X-CSRFToken'] =
      token ?? Cookies.get('csrftoken');
  };

  const removeCsrfToken = () => {
    Cookies.remove('csrftoken');
  };

  return { setCsrfTokenHeader, removeCsrfToken };
};
