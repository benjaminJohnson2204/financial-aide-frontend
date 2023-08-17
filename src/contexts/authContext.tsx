import { UserResponse, UsersApiAxiosParamCreator } from '@/api-client';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { useSetCsrfTokenHeader } from '@/utils/backendAPI/csrfToken';
import { ReactElement, createContext, useEffect, useState } from 'react';

interface IAuthContext {
  user: UserResponse | null;
  loadingUser: boolean;
  refreshUser: () => unknown;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  loadingUser: true,
  refreshUser: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const { setCsrfTokenHeader } = useSetCsrfTokenHeader();

  const usersClient = UsersApiAxiosParamCreator();

  const refreshUser = () => {
    setLoadingUser(true);
    usersClient
      .apiUsersWhoamiRetrieve()
      .then(({ url, options }) => backendClient.get(url, options))
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setUser(null);
      })
      .finally(() => {
        setCsrfTokenHeader();
        setLoadingUser(false);
      });
  };

  useEffect(refreshUser, []);

  return (
    <AuthContext.Provider value={{ user, loadingUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
