import { Close } from '@mui/icons-material';
import { Dialog, Modal } from '@mui/material';
import { ReactElement } from 'react';
import {
  BasePopupBody,
  BasePopupCloseButton,
  BasePopupContents,
  BasePopupHeader,
  BasePopupTitle,
} from './styles';
import { Colors } from '@/constants/colors';

interface BasePopupProps {
  isOpen: boolean;
  onClose: () => unknown;
  title: string;
  titleColor?: string;
  children: ReactElement;
}

export const BasePopup = ({
  isOpen,
  onClose,
  title,
  titleColor,
  children,
}: BasePopupProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <BasePopupContents>
        <BasePopupHeader>
          <BasePopupTitle color={titleColor}>{title}</BasePopupTitle>
          <BasePopupCloseButton onClick={onClose}>
            <Close fontSize='large' style={{ color: Colors.DARK_PURPLE }} />
          </BasePopupCloseButton>
        </BasePopupHeader>
        <BasePopupBody>{children}</BasePopupBody>
      </BasePopupContents>
    </Modal>
  );
};
