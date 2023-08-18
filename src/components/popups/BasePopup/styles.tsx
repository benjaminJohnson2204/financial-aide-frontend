import { Colors } from '@/constants/colors';
import { IconButton, Typography, styled } from '@mui/material';

export const BasePopupContents = styled('div')({
  position: 'absolute',
  width: 'auto',
  height: 'auto',
  minWidth: 650,
  minHeight: 350,
  maxHeight: '80vh',
  backgroundColor: Colors.WHITE,
  borderRadius: 24,
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  overflowY: 'scroll',
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  ['@media screen and (max-width: 700px)']: {
    minWidth: 350,
    width: 'calc(100vw - 40px) !important',
  },
});

export const BasePopupHeader = styled('div')({
  padding: '10px 15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `2px solid ${Colors.DARK_GREEN}`,
});

export const BasePopupTitle = styled(Typography)(
  ({ color }: { color?: string }) => ({
    fontSize: 24,
    fontWeight: 600,
    color: color ?? Colors.DARK_GREEN,
    textAlign: 'center',
  })
);

export const BasePopupCloseButton = styled(IconButton)({
  position: 'absolute',
  right: 20,
  top: 10,
  width: 36,
  height: 36,
  padding: 20,
});

export const BasePopupBody = styled('div')({
  width: 'calc(100% - 40px)',
  height: 'calc(100% - 40px)',
  padding: 20,
  ['@media screen and (max-width: 700px)']: {
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 20px)',
    padding: 10,
  },
});
