import { Colors } from '@/constants/colors';
import { Typography, styled } from '@mui/material';
import Link from 'next/link';

export const NavbarRoot = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: 85,
  backgroundColor: Colors.WHITE,
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
  zIndex: 99,
});

export const LinkNoUnderline = styled(Link)({
  textDecoration: 'none !important',
});

export const LogoText = styled(Typography)({
  color: Colors.DARK_GREEN,
  fontSize: 24,
  fontWeight: 600,
  ['@media screen and (max-width: 1024px)']: {
    fontSize: 18,
  },
  ['@media screen and (max-width: 800px)']: {
    fontSize: 14,
  },
});

export const NavbarHamburgerButton = styled('button')({
  '& path': {
    fill: Colors.BLACK,
  },
  border: 0,
  width: '100%',
  height: '100%',
  margin: 'auto',
  cursor: 'pointer',
  background: 'transparent',
});

export const NavbarButtonText = styled(Typography)({
  fontSize: 18,
  fontWeight: 600,
});
