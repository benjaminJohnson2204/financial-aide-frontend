import { UserResponse, UsersApiAxiosParamCreator } from '@/api-client';
import { LinkNoUnderline, NavbarHamburgerButton, NavbarRoot } from './styles';
import { LogoWithText } from './LogoWithText';
import {
  Box,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { NavbarButton } from './NavbarButton';
import { ArrowLeft, Code, Person } from '@mui/icons-material';
import { Colors } from '@/constants/colors';
import Image from 'next/image';
import { CustomButton } from '@/components/buttons/CustomButton';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { backendClient } from '@/utils/backendAPI/backendClient';
import { useSetCsrfTokenHeader } from '@/utils/backendAPI/csrfToken';

export const Navbar = () => {
  const { loadingUser, refreshUser, user } = useContext(AuthContext);
  const { setCsrfTokenHeader, removeCsrfToken } = useSetCsrfTokenHeader();
  const isAuthenticated = !!user;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('@media screen and (max-width: 1024px)');
  const isSmallMobile = useMediaQuery('@media screen and (max-width: 800px)');
  const isTinyMobile = useMediaQuery('@media screen and (max-width: 600px)');

  const usersClient = UsersApiAxiosParamCreator();

  const logout = () => {
    usersClient
      .apiUsersLogoutCreate()
      .then(({ url, options }) => backendClient.post(url, {}, options))
      .then((response) => {
        removeCsrfToken();
        refreshUser();
      });
  };

  const renderBudgetsLink = () => {
    return (
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
        onClick={() => setDrawerOpen(false)}
      />
    );
  };

  const renderExpensesLink = () => {
    return (
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
        onClick={() => setDrawerOpen(false)}
      />
    );
  };

  const renderSourceCodeLink = () => {
    return (
      <NavbarButton
        icon={<Code fontSize='medium' />}
        text='Source Code'
        href='/source'
        color={Colors.DARK_PURPLE}
        onClick={() => setDrawerOpen(false)}
      />
    );
  };

  const renderProfileView = () => {
    return (
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
        onClick={() => setDrawerOpen(false)}
      />
    );
  };

  const renderAuthRightSide = () => {
    return (
      <>
        {isMobile ? null : (
          <>
            <Grid item xs={1.25} margin='auto'>
              {renderBudgetsLink()}
            </Grid>
            <Grid item xs={1.25} margin='auto'>
              {renderExpensesLink()}
            </Grid>
          </>
        )}
        {isMobile ? (
          <Grid item xs={1} sm={4} />
        ) : (
          <Grid item xs={1.5} md={1.25} margin='auto'>
            {renderProfileView()}
          </Grid>
        )}
        <Grid item xs={1.25} margin='auto'>
          <CustomButton
            variant='outlined'
            primaryColor={Colors.DARK_GREEN}
            secondaryColor={Colors.WHITE}
            onClick={logout}
            style={
              isMobile
                ? {
                    fontSize: isSmallMobile ? 14 : 18,
                    width: isSmallMobile ? 90 : 120,
                  }
                : {}
            }
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
        <Grid item xs={0} md={2} lg={3.5}></Grid>
        <Grid item xs={2.5} md={2} lg={1.5} margin='auto'>
          <LinkNoUnderline href='/login'>
            <CustomButton
              variant='outlined'
              primaryColor={Colors.DARK_GREEN}
              secondaryColor={Colors.WHITE}
              style={
                isMobile
                  ? {
                      fontSize: isSmallMobile ? 14 : 18,
                      width: isSmallMobile ? 90 : 120,
                    }
                  : {}
              }
            >
              Login
            </CustomButton>
          </LinkNoUnderline>
        </Grid>

        <Grid item xs={2.5} md={2} lg={1.5} margin='auto'>
          <LinkNoUnderline href='/register'>
            <CustomButton
              variant='contained'
              primaryColor={Colors.DARK_GREEN}
              secondaryColor={Colors.WHITE}
              style={
                isMobile
                  ? {
                      fontSize: isSmallMobile ? 14 : 18,
                      width: isSmallMobile ? 90 : 120,
                    }
                  : {}
              }
            >
              Sign Up
            </CustomButton>
          </LinkNoUnderline>
        </Grid>
      </>
    );
  };

  return (
    <>
      <NavbarRoot>
        <Grid container>
          {isMobile ? (
            <Grid item xs={1}>
              <NavbarHamburgerButton onClick={() => setDrawerOpen(true)}>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 18 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M0 0H18V2H0V0ZM0 5H18V7H0V5ZM0 10H18V12H0V10Z'
                    fill='inherit'
                  />
                </svg>
              </NavbarHamburgerButton>
            </Grid>
          ) : null}
          <Grid item xs={4} md={3} margin='auto'>
            <LogoWithText />
          </Grid>
          {isMobile ? null : (
            <Grid item xs={2.25} margin='auto'>
              {renderSourceCodeLink()}
            </Grid>
          )}
          {loadingUser ? (
            <CircularProgress size={36} />
          ) : isAuthenticated ? (
            renderAuthRightSide()
          ) : (
            renderNonAuthRightSide()
          )}
        </Grid>
      </NavbarRoot>
      <Drawer
        anchor='left'
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <Box
          display='flex'
          flexDirection='column'
          alignItems='start'
          gap={3}
          padding={2}
          width={320}
          maxWidth='75vw'
        >
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ArrowLeft
              fontSize='large'
              style={{ width: 60, height: 60, color: Colors.DARK_PURPLE }}
            />
          </IconButton>
          {renderSourceCodeLink()}
          {isAuthenticated ? (
            <>
              {renderBudgetsLink()}
              {renderExpensesLink()}
              {renderProfileView()}
            </>
          ) : null}
        </Box>
      </Drawer>
    </>
  );
};
