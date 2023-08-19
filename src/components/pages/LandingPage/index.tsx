import { Colors } from '@/constants/colors';
import { useMediaQuery } from '@mui/material';
import {
  LandingPageGridText,
  LandingPageImagesContainer,
  LandingPageScreenshot,
  LandingPageSection,
  LandingPageSectionTitle,
  LandingPageSubtitle,
  LandingPageTitle,
} from './styles';

export const LandingPage = () => {
  const isMobile = useMediaQuery('@media screen and (max-width: 800px)');
  const isTinyMobile = useMediaQuery('@media screen and (max-width: 550px)');

  const mobileMultiplier = isTinyMobile
    ? 0.5
    : isMobile
    ? (window.innerWidth - 400) / 400
    : 1;

  return (
    <>
      <LandingPageTitle>Financial Aide</LandingPageTitle>
      <LandingPageSubtitle>
        Free, open source budgeting tool developed by Benjamin Johnson
      </LandingPageSubtitle>
      <LandingPageSection backgroundcolor={Colors.LIGHT_BLUE}>
        <LandingPageSectionTitle color={Colors.DARK_GREEN}>
          Create & Manage Budgets with Categories
        </LandingPageSectionTitle>
        <LandingPageImagesContainer>
          <LandingPageScreenshot
            src='/LandingScreenshots/Budgets List.png'
            alt='List of budgets'
            width={mobileMultiplier * 653}
            height={mobileMultiplier * 368}
          />
          <LandingPageScreenshot
            src='/LandingScreenshots/View Budget.png'
            alt='Form to view/edit budget'
            width={mobileMultiplier * 630}
            height={mobileMultiplier * 252}
          />
          <LandingPageScreenshot
            src='/LandingScreenshots/Budget Categories Table.png'
            alt='Table of budget categories'
            width={mobileMultiplier * 640}
            height={mobileMultiplier * 450}
          />
          <LandingPageScreenshot
            src='/LandingScreenshots/Budget Categories Pie Chart.png'
            alt='Chart showing budget categories'
            width={mobileMultiplier * 640}
            height={mobileMultiplier * 450}
          />
        </LandingPageImagesContainer>
      </LandingPageSection>
      <LandingPageSection backgroundcolor={Colors.LIGHT_GREEN}>
        <LandingPageSectionTitle color={Colors.DARK_PURPLE}>
          Enter & Track Expenses
        </LandingPageSectionTitle>
        <LandingPageImagesContainer>
          <LandingPageScreenshot
            src='/LandingScreenshots/Enter Expense.png'
            alt='Form to enter expense'
            width={mobileMultiplier * 600}
            height={mobileMultiplier * 340}
          />
          <LandingPageScreenshot
            src='/LandingScreenshots/Expenses Table Filter Category.png'
            alt='Table of expenses filtered by category'
            width={mobileMultiplier * 700}
            height={mobileMultiplier * 275}
          />
          <LandingPageGridText>
            Easily filter, search, and sort
          </LandingPageGridText>
          <LandingPageScreenshot
            src='/LandingScreenshots/Expenses Table Search Sort.png'
            alt='Table of expenses with search and sort'
            width={mobileMultiplier * 750}
            height={mobileMultiplier * 200}
          />
        </LandingPageImagesContainer>
      </LandingPageSection>
      <LandingPageSection backgroundcolor={Colors.WHITE}>
        <LandingPageSectionTitle color={Colors.BLACK}>
          Compare Planned vs. Actual Spending
        </LandingPageSectionTitle>
        <LandingPageImagesContainer>
          <LandingPageScreenshot
            src='/LandingScreenshots/Comparison Pie Charts.png'
            alt='Pie charts of planned vs. actual expenses'
            width={mobileMultiplier * 700}
            height={mobileMultiplier * 245}
          />
          <LandingPageScreenshot
            src='/LandingScreenshots/Comparison Bar Chart.png'
            alt='Bar chart of planned vs. actual expenses'
            width={mobileMultiplier * 500}
            height={mobileMultiplier * 360}
          />
          <LandingPageScreenshot
            src='/LandingScreenshots/Comparison Table.png'
            alt='Table of planned vs. actual expenses'
            width={mobileMultiplier * 500}
            height={mobileMultiplier * 380}
          />
          <LandingPageGridText style={{ textAlign: 'left' }}>
            Easily identify overspending
          </LandingPageGridText>
        </LandingPageImagesContainer>
      </LandingPageSection>
      <LandingPageSection backgroundcolor={Colors.LIGHT_GRAY}>
        <LandingPageSectionTitle color={Colors.DARK_PURPLE}>
          Export data to CSV files
        </LandingPageSectionTitle>
        <LandingPageImagesContainer>
          <LandingPageScreenshot
            src='/LandingScreenshots/Expenses CSV Export.png'
            alt='CSV export of expenses'
            width={mobileMultiplier * 710}
            height={mobileMultiplier * 192}
          />
          <LandingPageScreenshot
            src='/LandingScreenshots/Comparison CSV Export.png'
            alt='CSV export of actual vs. planned spending'
            width={mobileMultiplier * 600}
            height={mobileMultiplier * 480}
          />
        </LandingPageImagesContainer>
      </LandingPageSection>
    </>
  );
};
