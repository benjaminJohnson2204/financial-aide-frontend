import Cookies from 'js-cookie';
import { backendClient } from './backendClient';

export const useSetCsrfTokenHeader = () => {
  const setCsrfTokenHeader = () => {
    backendClient.defaults.headers.common['X-CSRFToken'] =
      Cookies.get('csrftoken');
  };

  const removeCsrfToken = () => {
    Cookies.remove('csrftoken');
  };

  return { setCsrfTokenHeader, removeCsrfToken };
};
