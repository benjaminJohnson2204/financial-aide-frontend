import { Colors } from '@/constants/colors';
import { Typography, styled } from '@mui/material';
import Image from 'next/image';

export const LandingPageTitle = styled(Typography)({
  fontSize: 48,
  fontWeight: 600,
  color: Colors.DARK_PURPLE,
  textAlign: 'center',
  ['@media screen and (max-width: 800px)']: {
    fontSize: 32,
  },
});

export const LandingPageSubtitle = styled(Typography)({
  fontSize: 24,
  color: Colors.BLACK,
  textAlign: 'center',
  ['@media screen and (max-width: 800px)']: {
    fontSize: 18,
  },
});

export const LandingPageSection = styled('section')(
  ({ backgroundcolor }: { backgroundcolor: string }) => ({
    backgroundColor: backgroundcolor,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    padding: 18,
    border: `2px solid ${Colors.BLACK}`,
    borderRadius: 24,
  })
);

export const LandingPageSectionTitle = styled(Typography)(
  ({ color }: { color: string }) => ({
    fontSize: 36,
    fontWeight: 600,
    color,
    textAlign: 'center',
    ['@media screen and (max-width: 800px)']: {
      fontSize: 24,
    },
  })
);

export const LandingPageGridText = styled(Typography)({
  fontSize: 30,
  fontWeight: 550,
  textAlign: 'center',
  color: Colors.BLACK,
  ['@media screen and (max-width: 800px)']: {
    fontSize: 20,
  },
});

export const LandingPageImagesContainer = styled('div')({
  padding: 15,
  //   display: 'flex',
  //   flexDirection: 'row',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  //   width: 'calc(100% - 100px)',
  maxWidth: '100vw',
  gap: 25,
  alignItems: 'center',
  justifyContent: 'space-between',
  ['@media screen and (max-width: 1024px)']: {
    gridTemplateColumns: '1fr',
  },
});

export const LandingPageScreenshot = styled(Image)({
  borderRadius: 12,
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});
