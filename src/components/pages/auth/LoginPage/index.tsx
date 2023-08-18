import { Input, OutlinedInput, Typography } from '@mui/material';
import {
  AuthPageRoot,
  AuthFormRoot,
  AuthFieldsContainer,
  AuthInput,
  AuthSubmitButtonContainer,
  AuthInputSpacer,
} from '@/components/pages/auth/common/styles';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { Colors } from '@/constants/colors';
import { CustomButton } from '@/components/buttons/CustomButton';
import { AuthContext } from '@/contexts/authContext';
import { useSetCsrfTokenHeader } from '@/utils/backendAPI/csrfToken';
import { UsersApiAxiosParamCreator } from '@/api-client';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { useRedirect } from '@/utils/redirect';

export const LoginPage = () => {
  const { user, loadingUser, refreshUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const { setCsrfTokenHeader } = useSetCsrfTokenHeader();

  useRedirect(false);

  const login = () => {
    const form = document.getElementById('login-form') as HTMLFormElement;
    const username = form.username.value;
    const password = form.password.value;

    const postData = {
      username,
      password,
    };

    setErrorMessage('');

    const usersClient = UsersApiAxiosParamCreator();
    usersClient.apiUsersLoginCreate(postData).then(({ url, options }) => {
      backendClient
        .post(url, postData, options)
        .then((response) => {
          Cookies.set('csrftoken', response.headers['X-Csrftoken']);
          setCsrfTokenHeader(response.headers['X-Csrftoken']);
          refreshUser();
        })
        .catch((error) => {
          if (!error.response) {
            setErrorMessage('Unable to contact server');
          } else if (error.response.status === 400) {
            setErrorMessage('Invalid credentials');
          } else if (error.response.status === 500) {
            setErrorMessage('Internal server error');
          }
        });
    });
  };

  return (
    <AuthPageRoot>
      <AuthFormRoot id='login-form'>
        <Typography fontSize={36}>Login</Typography>
        <Typography fontSize={14} marginTop={3}>
          {"Don't have an account?"} <Link href='/register'>Sign Up</Link>
        </Typography>
        <AuthFieldsContainer>
          <Typography fontSize={14}>Username</Typography>
          <AuthInput name='username' />
          <AuthInputSpacer />
          <Typography fontSize={14}>Password</Typography>
          <AuthInput name='password' type='password' />
          <Typography fontSize={14} color={Colors.RED}>
            {errorMessage}
          </Typography>
          <AuthInputSpacer />
          <AuthSubmitButtonContainer>
            <CustomButton
              variant='contained'
              primaryColor={Colors.DARK_GREEN}
              secondaryColor={Colors.WHITE}
              onClick={login}
            >
              Submit
            </CustomButton>
          </AuthSubmitButtonContainer>
        </AuthFieldsContainer>
      </AuthFormRoot>
    </AuthPageRoot>
  );
};
