import { Colors } from '@/constants/colors';
import { Tab, Tabs, styled } from '@mui/material';

export const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: Colors.DARK_GREEN,
    height: 3,
  },
  '& .MuiTab-root.Mui-selected': {
    color: Colors.DARK_GREEN,
  },
});

export const StyledTab = styled(Tab)({
  color: Colors.BLACK,
  textTransform: 'capitalize',
  fontSize: 16,
  fontWeight: 600,
  marginLeft: 5,
  marginRight: 5,
});
