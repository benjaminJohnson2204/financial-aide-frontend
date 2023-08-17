import { Colors } from '@/constants/colors';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { LinkNoUnderline } from './styles';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

export const LogoWithText = () => {
  const { user } = useContext(AuthContext);

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
          width={64}
          height={64}
        />
        <Typography color={Colors.DARK_GREEN} fontSize={24} fontWeight={600}>
          Financial Aide
        </Typography>
      </Box>
    </LinkNoUnderline>
  );
};
