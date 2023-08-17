import { Colors } from '@/constants/colors';
import { TableCell, TableRow, styled } from '@mui/material';

export const CategoriesTableRow = styled(TableRow)(
  ({ index }: { index: number }) => ({
    backgroundColor: index % 2 === 0 ? Colors.WHITE : Colors.LIGHT_GRAY,
  })
);

export const CategoriesTableCell = styled(TableCell)({
  borderBottom: 'none !important',
});
