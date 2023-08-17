import { Colors } from '@/constants/colors';
import { styled } from '@mui/material';

export const BudgetCardRoot = styled('div')({
  borderRadius: 18,
  width: 275,
  height: 250,
  backgroundColor: Colors.WHITE,
  position: 'relative',
  paddingTop: 40,
});

export const BudgetCardHeader = styled('div')({
  backgroundColor: Colors.DARK_PURPLE,
  color: Colors.WHITE,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 40,
  fontSize: 24,
  fontWeight: 550,
  borderRadius: '18px 18px 0 0',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const BudgetCardBody = styled('div')({
  padding: 12,
  position: 'relative',
  height: 'calc(100% - 40px)',
});

export const BudgetCardButtonsRoot = styled('div')({
  position: 'absolute',
  right: 0,
  top: 0,
  backgroundColor: Colors.LIGHT_GRAY,
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  padding: 8,
  alignItems: 'center',
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
});

export const SeeMoreButtonContainer = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 12,
});
