import { Colors } from '@/constants/colors';
import { Grid, IconButton, styled } from '@mui/material';

export const BudgetsTopRow = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  marginBottom: 20,
});

export const NewBudgetButton = styled(IconButton)({
  position: 'absolute',
  right: 50,
  width: 72,
  height: 72,
  backgroundColor: Colors.DARK_PURPLE,
  ['@media screen and (max-width: 800px)']: {
    position: 'fixed',
    bottom: 50,
  },
});

export const BudgetCardsContainer = styled(Grid)({
  borderRadius: 24,
  backgroundColor: Colors.LIGHT_GREEN,
  width: '100%',
  height: '100%',
});
