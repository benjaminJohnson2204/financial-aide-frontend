import { styled } from '@mui/material';

export const ExpensesTopRow = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  marginBottom: 20,
  gap: 25,
  ['@media screen and (max-width: 800px)']: {
    flexDirection: 'column',
  },
});
