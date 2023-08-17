import {
  ButtonBase as MUIButton,
  ButtonProps as MUIButtonProps,
} from '@mui/material';
import { styled } from '@mui/styles';

interface BaseButtonProps extends MUIButtonProps {
  primaryColor: string;
  secondaryColor: string;
}

export const CustomButton = ({
  primaryColor,
  secondaryColor,
  size,
  variant,
  ...props
}: BaseButtonProps) => {
  const styles = {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    width: 136,
    height: 36,
    fontSize:
      size == 'small' ? 12 : size == 'medium' ? 14 : size == 'large' ? 18 : 16,
    fontWeight: 600,
    border: variant == 'outlined' ? `1px solid ${primaryColor}` : '',
    borderRadius: 24,
    backgroundColor: variant == 'outlined' ? secondaryColor : primaryColor,
    color: variant == 'outlined' ? primaryColor : secondaryColor,
  };

  return (
    <MUIButton {...props} style={{ ...(styles as any), ...props.style }} />
  );
};
