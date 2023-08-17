import { UserResponse, UsersApiAxiosParamCreator } from '@/api-client';
import { LinkNoUnderline, NavbarRoot } from './styles';
import { LogoWithText } from './LogoWithText';
import { CircularProgress, Grid } from '@mui/material';
import { NavbarButton } from './NavbarButton';
import { Code, Person } from '@mui/icons-material';
import { Colors } from '@/constants/colors';
import Image from 'next/image';
import { CustomButton } from '@/components/buttons/CustomButton';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { useSetCsrfTokenHeader } from '@/utils/backendAPI/csrfToken';

export const Navbar = () => {
  const { loadingUser, refreshUser, user } = useContext(AuthContext);
  const { setCsrfTokenHeader, removeCsrfToken } = useSetCsrfTokenHeader();
  const isAuthenticated = !!user;

  const usersClient = UsersApiAxiosParamCreator();

  const logout = () => {
    usersClient
      .apiUsersLogoutCreate()
      .then(({ url, options }) => backendClient.post(url, {}, options))
      .then((response) => {
        removeCsrfToken();
        setCsrfTokenHeader();
        refreshUser();
      });
  };

  const renderAuthRightSide = () => {
    return (
      <>
        <Grid item xs={1.25} margin='auto'>
          <NavbarButton
            icon={
              <Image
                src='/icons/pieChart.svg'
                alt='Pie Chart'
                width={24}
                height={24}
              />
            }
            text='Budgets'
            href='/budgets'
            color={Colors.DARK_GREEN}
          />
        </Grid>
        <Grid item xs={1.25} margin='auto'>
          <NavbarButton
            icon={
              <Image
                src='/icons/creditCard.svg'
                alt='Credit Card'
                width={24}
                height={24}
              />
            }
            text='Expenses'
            href='/expenses'
            color={Colors.DARK_GREEN}
          />
        </Grid>
        <Grid item xs={1.25} margin='auto'>
          <NavbarButton
            icon={
              <Person
                fontSize='medium'
                style={{
                  color: Colors.DARK_PURPLE,
                }}
              />
            }
            text={user?.username ?? ''}
            color={Colors.DARK_PURPLE}
          />
        </Grid>
        <Grid item xs={1.25} margin='auto'>
          <CustomButton
            variant='outlined'
            primaryColor={Colors.DARK_GREEN}
            secondaryColor={Colors.WHITE}
            onClick={logout}
          >
            Sign Out
          </CustomButton>
        </Grid>
      </>
    );
  };

  const renderNonAuthRightSide = () => {
    return (
      <>
        <Grid item xs={3.5}></Grid>
        <Grid item xs={1.5} margin='auto'>
          <LinkNoUnderline href='/login'>
            <CustomButton
              variant='outlined'
              primaryColor={Colors.DARK_GREEN}
              secondaryColor={Colors.WHITE}
            >
              Login
            </CustomButton>
          </LinkNoUnderline>
        </Grid>

        <Grid item xs={1.5} margin='auto'>
          <LinkNoUnderline href='/register'>
            <CustomButton
              variant='contained'
              primaryColor={Colors.DARK_GREEN}
              secondaryColor={Colors.WHITE}
            >
              Sign Up
            </CustomButton>
          </LinkNoUnderline>
        </Grid>
      </>
    );
  };

  return (
    <NavbarRoot>
      <Grid container>
        <Grid item xs={3} margin='auto'>
          <LogoWithText />
        </Grid>
        <Grid item xs={2.25} margin='auto'>
          <NavbarButton
            icon={<Code fontSize='medium' />}
            text='Source Code'
            href='/source'
            color={Colors.DARK_PURPLE}
          />
        </Grid>
        {loadingUser ? (
          <CircularProgress size={36} />
        ) : isAuthenticated ? (
          renderAuthRightSide()
        ) : (
          renderNonAuthRightSide()
        )}
      </Grid>
    </NavbarRoot>
  );
};
