import { Typography } from '@mui/material';
import { FilterPopupRoot, StyledPopover } from '../FilterPopup/styles';

import { CustomInputField } from '@/components/inputs/InputField';
import { useEffect } from 'react';
import { Colors } from '@/constants/colors';

interface DateRangeFilterPopupProps {
  title: string;
  anchor: HTMLElement | null;
  setAnchor: (newAnchor: HTMLElement | null) => unknown;
  setMinDate: (newMinDate: Date) => unknown;
  setMaxDate: (newMaxDate: Date) => unknown;
}

export const DateRangeFilterPopup = ({
  title,
  anchor,
  setAnchor,
  setMinDate,
  setMaxDate,
}: DateRangeFilterPopupProps) => {
  const updateMinDate = (e: any) => {
    setMinDate(e.target.value);
  };

  const updateMaxDate = (e: any) => {
    setMaxDate(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      const minDateInput = document.getElementById('min-date-input');
      minDateInput?.addEventListener('input', updateMinDate);
      const maxDateInput = document.getElementById('max-date-input');
      maxDateInput?.addEventListener('input', updateMaxDate);

      return () => {
        minDateInput?.removeEventListener('input', updateMinDate);
        maxDateInput?.removeEventListener('input', updateMaxDate);
      };
    }, 250);
  }, [anchor]);

  return (
    <StyledPopover
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={() => setAnchor(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <FilterPopupRoot>
        <Typography fontSize={24} color={Colors.DARK_PURPLE}>
          {title}
        </Typography>
        <CustomInputField
          editable
          id='min-date-input'
          inputType='date'
          label='Earliest'
          name='min-date-input'
          style={{ minWidth: 120 }}
          inGrid={false}
        />
        <CustomInputField
          editable
          id='max-date-input'
          inputType='date'
          label='Latest'
          name='max-date-input'
          style={{ minWidth: 120 }}
          inGrid={false}
        />
      </FilterPopupRoot>
    </StyledPopover>
  );
};
