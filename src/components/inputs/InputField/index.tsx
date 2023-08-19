import { SelectField } from '@/components/inputs/SelectField';
import { ViewOnlyInput } from '@/components/inputs/ViewOnlyField';
import { AuthInput } from '@/components/pages/auth/common/styles';
import {
  Box,
  Grid,
  MenuItem,
  Select,
  StandardTextFieldProps,
  Typography,
} from '@mui/material';
import { ReactElement } from 'react';

interface CustomInputFieldProps extends StandardTextFieldProps {
  editable: boolean;
  inputType: 'text' | 'date' | 'select' | 'time';
  label: string;
  multiline?: boolean;
  name: string;
  selectContents?: ReactElement[];
  defaultValue?: string | null;
  onChange?: (newValue: any) => unknown;
  inGrid?: boolean;
}

export const CustomInputField = ({
  editable,
  inputType,
  label,
  multiline,
  name,
  selectContents,
  defaultValue,
  onChange,
  inGrid = true,
  ...props
}: CustomInputFieldProps) => {
  const renderContents = () => {
    return (
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
        gap={5}
      >
        <Typography
          fontSize={14}
          textAlign='right'
          fontWeight={550}
          width={140}
          margin='auto'
        >
          {label}
        </Typography>
        {inputType === 'select' ? (
          <SelectField
            disabled={!editable}
            name={name}
            value={defaultValue}
            onChange={(e) => {
              onChange?.(e.target.value);
            }}
          >
            {selectContents}
          </SelectField>
        ) : editable ? (
          <AuthInput
            multiline={multiline ?? false}
            name={name}
            type={inputType}
            defaultValue={defaultValue}
            onChange={onChange}
            {...props}
          />
        ) : (
          <ViewOnlyInput
            disabled
            multiline={multiline}
            name={name}
            type={inputType}
            value={defaultValue}
            {...props}
          />
        )}
      </Box>
    );
  };

  return inGrid ? (
    <Grid item xs={12} sm={6}>
      {renderContents()}
    </Grid>
  ) : (
    renderContents()
  );
};
