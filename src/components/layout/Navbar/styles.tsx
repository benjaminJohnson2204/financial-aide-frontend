import { Colors } from '@/constants/colors';
import { styled } from '@mui/material';
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
