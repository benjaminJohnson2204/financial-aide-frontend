import { Colors } from '@/constants/colors';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { LinkNoUnderline, LogoText } from './styles';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

export const LogoWithText = () => {
  const { user } = useContext(AuthContext);
  const isSmallMobile = useMediaQuery('@media screen and (max-width: 800px)');

  return (
    <LinkNoUnderline href={user ? '/home' : '/'}>
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        gap={2}
        padding={2}
      >
        <Image
          src='icons/mainLogo.svg'
          alt='Handshake'
          width={isSmallMobile ? 48 : 64}
          height={isSmallMobile ? 48 : 64}
        />
        <LogoText>Financial Aide</LogoText>
      </Box>
    </LinkNoUnderline>
  );
};
