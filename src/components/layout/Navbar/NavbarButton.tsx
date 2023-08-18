import { Box, Typography, styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { LinkNoUnderline, NavbarButtonText } from './styles';

interface NavbarButtonProps {
  icon: ReactElement;
  color: string;
  text: string;
  href?: string;
  onClick?: () => unknown;
}

export const NavbarButton = ({
  icon,
  color,
  text,
  href,
  onClick,
}: NavbarButtonProps) => {
  const renderContents = () => {
    return (
      <Box
        display='flex'
        flexDirection='row'
        gap={2}
        alignItems='center'
        onClick={onClick}
      >
        {icon}
        <NavbarButtonText style={{ color }}>{text}</NavbarButtonText>
      </Box>
    );
  };

  return href ? (
    <LinkNoUnderline href={href}>{renderContents()}</LinkNoUnderline>
  ) : (
    renderContents()
  );
};
