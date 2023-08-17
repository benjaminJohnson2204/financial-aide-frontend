import { Box, Typography, styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { LinkNoUnderline } from './styles';

interface NavbarButtonProps {
  icon: ReactElement;
  color: string;
  text: string;
  href?: string;
}

export const NavbarButton = ({
  icon,
  color,
  text,
  href,
}: NavbarButtonProps) => {
  const renderContents = () => {
    return (
      <Box display='flex' flexDirection='row' gap={2} alignItems='center'>
        {icon}
        <Typography color={color} fontSize={18} fontWeight={600}>
          {text}
        </Typography>
      </Box>
    );
  };

  return href ? (
    <LinkNoUnderline href={href}>{renderContents()}</LinkNoUnderline>
  ) : (
    renderContents()
  );
};
