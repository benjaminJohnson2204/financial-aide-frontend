import { Colors } from '@/constants/colors';
import {
  IconButton,
  Pagination,
  TableCell,
  TableRow,
  styled,
} from '@mui/material';

export const ExpensesTableRow = styled(TableRow)(
  ({ index }: { index: number }) => ({
    backgroundColor: index % 2 === 0 ? Colors.WHITE : Colors.LIGHT_GRAY,
  })
);

export const ExpensesTableCell = styled(TableCell)({
  borderBottom: 'none !important',
  cursor: 'pointer',
});

export const ExpensesHeaderCellContents = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
});

export const OrderingArrowButton = styled(IconButton)({
  width: 20,
  height: 20,
});

export const PaginationContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'end',
  padding: 20,
});

export const StyledPagination = styled(Pagination)({
  ul: {
    '& .Mui-selected ': {
      color: Colors.WHITE,
      backgroundColor: Colors.DARK_GREEN,
      '&:hover': {
        backgroundColor: Colors.DARK_GREEN,
      },
    },
  },
});
