import { Colors } from '@/constants/colors';
import { TextField, Typography, styled } from '@mui/material';

export const AuthPageRoot = styled('div')({
  backgroundColor: Colors.LIGHT_GREEN,
  position: 'fixed',
  top: 90,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: 'calc(100vh - 90px)',
});

export const AuthFormRoot = styled('form')({
  width: '750px',
  height: '80%',
  borderRadius: 24,
  border: `2px solid ${Colors.BLACK}`,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  padding: 20,
  ['@media screen and (max-width: 800px)']: {
    width: '80%',
  },
});

export const AuthFieldsContainer = styled('div')({
  marginTop: 20,
  marginBottom: 20,
  width: 300,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: 8,
  ['@media screen and (max-width: 600px)']: {
    width: 200,
  },
});

export const AuthInput = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: 14,
    height: 36,
    backgroundColor: Colors.WHITE,
    '& fieldset': {
      borderColor: Colors.BLACK,
    },
    '&:hover fieldset': {
      borderColor: `${Colors.DARK_GREEN} !important`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${Colors.DARK_GREEN} !important`,
    },
  },
});

export const AuthErrorText = styled(Typography)({
  fontSize: 12,
  color: Colors.RED,
});

export const AuthInputSpacer = styled('div')({
  height: 20,
});

export const AuthSubmitButtonContainer = styled('div')({
  marginLeft: 'auto',
  marginRight: 0,
});
