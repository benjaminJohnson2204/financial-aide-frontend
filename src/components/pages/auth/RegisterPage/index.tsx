import { Input, OutlinedInput, Typography } from '@mui/material';
import {
  AuthPageRoot,
  AuthFormRoot,
  AuthFieldsContainer,
  AuthInput,
  AuthSubmitButtonContainer,
  AuthInputSpacer,
  AuthErrorText,
} from '@/components/pages/auth/common/styles';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { Colors } from '@/constants/colors';
import { CustomButton } from '@/components/buttons/CustomButton';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { UsersApiAxiosParamCreator } from '@/api-client';
import { useContext, useEffect, useState } from 'react';
import { useSetCsrfTokenHeader } from '@/utils/backendAPI/csrfToken';
import { AuthContext } from '@/contexts/authContext';
import { useRedirect } from '@/utils/redirect';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const FIELD_REQUIRED_TEXT = 'This field is required';

export const RegisterPage = () => {
  const getDefaultErrorTexts = () => ({
    email: '',
    username: '',
    password: '',
    confirmation: '',
  });

  const { user, loadingUser, refreshUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const { setCsrfTokenHeader } = useSetCsrfTokenHeader();
  const [errorTexts, setErrorTexts] = useState(getDefaultErrorTexts());

  useRedirect(false);

  const register = () => {
    const form = document.getElementById('register-form') as HTMLFormElement;
    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;
    const confirmation = form.confirmation.value;

    setErrorTexts(getDefaultErrorTexts());
    setErrorMessage('');

    if (email.length === 0) {
      setErrorTexts((prevTexts) => ({
        ...prevTexts,
        email: FIELD_REQUIRED_TEXT,
      }));
      return;
    }

    if (username.length === 0) {
      setErrorTexts((prevTexts) => ({
        ...prevTexts,
        username: FIELD_REQUIRED_TEXT,
      }));
      return;
    }

    if (password.length === 0) {
      setErrorTexts((prevTexts) => ({
        ...prevTexts,
        password: FIELD_REQUIRED_TEXT,
      }));
      return;
    }

    if (confirmation.length === 0) {
      setErrorTexts((prevTexts) => ({
        ...prevTexts,
        confirmation: FIELD_REQUIRED_TEXT,
      }));
      return;
    }

    if (!email.match(EMAIL_REGEX)) {
      setErrorTexts((prevTexts) => ({
        ...prevTexts,
        email: 'Invalid email address',
      }));
      return;
    }

    if (password !== confirmation) {
      setErrorTexts((prevTexts) => ({
        ...prevTexts,
        confirmation: "Passwords don't match",
      }));
      return;
    }

    const postData = {
      email,
      username,
      password,
    };

    const usersClient = UsersApiAxiosParamCreator();
    usersClient
      .apiUsersRegisterCreate(postData)
      .then(({ url, options }) =>
        backendClient.post(url, postData, options).then((response) => {
          Cookies.set('csrftoken', response.headers['x-csrftoken']);
          setCsrfTokenHeader(response.headers['x-csrftoken']);
          refreshUser();
        })
      )
      .catch((error) => {
        if (!error.response) {
          setErrorMessage('Unable to contact server');
        } else if (error.response.status === 400) {
          setErrorMessage('Invalid credentials');
        } else if (error.response.status === 500) {
          setErrorMessage('Internal server error');
        }
      });
  };

  return (
    <AuthPageRoot>
      <AuthFormRoot id='register-form'>
        <Typography fontSize={36}>Create Account</Typography>
        <Typography fontSize={14} marginTop={1}>
          {'Already have an account?'} <Link href='/login'>Login</Link>
        </Typography>
        <AuthFieldsContainer>
          <Typography fontSize={14}>Email</Typography>
          <AuthInput name='email' />
          <AuthErrorText>{errorTexts.email}</AuthErrorText>
          <Typography fontSize={14}>Username</Typography>
          <AuthInput name='username' />
          <AuthErrorText>{errorTexts.username}</AuthErrorText>
          <Typography fontSize={14}>Password</Typography>
          <AuthInput name='password' type='password' />
          <AuthErrorText>{errorTexts.password}</AuthErrorText>
          <Typography fontSize={14}>Confirm Password</Typography>
          <AuthInput name='confirmation' type='password' />
          <AuthErrorText>{errorTexts.confirmation}</AuthErrorText>
          <Typography fontSize={14} color={Colors.RED}>
            {errorMessage}
          </Typography>
          <AuthSubmitButtonContainer>
            <CustomButton
              variant='contained'
              primaryColor={Colors.DARK_GREEN}
              secondaryColor={Colors.WHITE}
              onClick={register}
            >
              Submit
            </CustomButton>
          </AuthSubmitButtonContainer>
        </AuthFieldsContainer>
      </AuthFormRoot>
    </AuthPageRoot>
  );
};
