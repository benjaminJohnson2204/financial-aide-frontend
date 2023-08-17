import { Checkbox, Popover, Typography } from '@mui/material';
import { FilterPopupRoot, FilterPopupRow, StyledPopover } from './styles';
import { Colors } from '@/constants/colors';

interface FilterPopupProps {
  title: string;
  anchor: HTMLElement | null;
  setAnchor: (newAnchor: HTMLElement | null) => unknown;
  options: any[];
  selectedOptions: any[];
  onChangeSelectedOptions: (newOptions: any[]) => unknown;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string | number;
}

export const FilterPopup = ({
  title,
  anchor,
  setAnchor,
  options,
  selectedOptions,
  onChangeSelectedOptions,
  getOptionLabel,
  getOptionValue,
}: FilterPopupProps) => {
  const isOptionSelected = (option: any) => {
    return selectedOptions?.some(
      (selectedOption) =>
        getOptionValue(selectedOption) === getOptionValue(option)
    );
  };

  const toggleOptionChecked = (option: string, checked: boolean) => {
    if (checked) {
      onChangeSelectedOptions(selectedOptions?.concat(option) ?? []);
    } else {
      onChangeSelectedOptions?.(
        selectedOptions?.filter(
          (selectedOption) =>
            getOptionValue(selectedOption) !== getOptionValue(option)
        ) ?? []
      );
    }
  };

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
        {options.map((option) => (
          <FilterPopupRow key={getOptionValue(option)}>
            <Typography fontSize={14}>{getOptionLabel(option)}</Typography>
            <Checkbox
              checked={isOptionSelected(option)}
              onChange={(e, checked) => toggleOptionChecked(option, checked)}
              style={{ color: Colors.DARK_GREEN }}
            />
          </FilterPopupRow>
        ))}
      </FilterPopupRoot>
    </StyledPopover>
  );
};
