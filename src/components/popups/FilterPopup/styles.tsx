import { Popover, styled } from '@mui/material';

export const StyledPopover = styled(Popover)({});

export const FilterPopupRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  borderRadius: 16,
  padding: 24,
  maxWidth: 270,
  maxHeight: 460,
});

export const FilterPopupRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  width: '100%',
});
