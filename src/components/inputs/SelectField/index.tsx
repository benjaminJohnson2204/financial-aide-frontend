import { Colors } from '@/constants/colors';
import { Select, styled } from '@mui/material';

export const SelectField = styled(Select)(
  ({ disabled }: { disabled: boolean }) => ({
    width: '100%',
    minWidth: 175,
    borderRadius: 14,
    height: 36,
    backgroundColor: disabled ? Colors.LIGHT_BLUE : Colors.WHITE,
    '& fieldset': {
      borderColor: Colors.BLACK,
    },
    '&:hover fieldset': {
      borderColor: `${Colors.DARK_GREEN} !important`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${Colors.DARK_GREEN} !important`,
    },
  })
);
