import { Colors } from '@/constants/colors';
import { TextField, styled } from '@mui/material';

export const ViewOnlyInput = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: 14,
    height: 32,
    backgroundColor: Colors.LIGHT_BLUE,
    '& fieldset': {
      borderColor: Colors.BLACK,
    },
    '& input': {
      color: Colors.BLACK,
      '-webkit-text-fill-color': Colors.BLACK,
    },
  },
});
