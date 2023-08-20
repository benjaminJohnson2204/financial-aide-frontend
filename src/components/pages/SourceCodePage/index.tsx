import { Colors } from '@/constants/colors';
import { Typography } from '@mui/material';

const FRONTEND_GITHUB_URL =
  'https://github.com/benjaminJohnson2204/financial-aide-frontend';
const BACKEND_GITHUB_URL =
  'https://github.com/benjaminJohnson2204/FinancialAideBackend';
const BACKEND_DOCS_URL = 'https://financial-aide-backend.vercel.app/docs/';

export const SourceCodePage = () => {
  return (
    <>
      <Typography
        fontSize={36}
        fontWeight={600}
        color={Colors.BLACK}
        textAlign='center'
      >
        Source Code
      </Typography>
      <Typography fontSize={14} marginTop={2}>
        My code is open source on GitHub. The front end and back end are
        separate repositories (hosted on separate domains).
      </Typography>
      <Typography fontSize={14} marginTop={2}>
        The front end code is at{' '}
        <a href={FRONTEND_GITHUB_URL} rel='noopener noreferrer' target='_blank'>
          {FRONTEND_GITHUB_URL}
        </a>
        .
      </Typography>
      <Typography fontSize={14} marginTop={2}>
        The back end code is at{' '}
        <a href={BACKEND_GITHUB_URL} rel='noopener noreferrer' target='_blank'>
          {BACKEND_GITHUB_URL}
        </a>
        .
      </Typography>
      <Typography fontSize={14} marginTop={2}>
        API documentation for the back end can be found at{' '}
        <a href={BACKEND_DOCS_URL} rel='noopener noreferrer' target='_blank'>
          {BACKEND_DOCS_URL}{' '}
        </a>
        . I used SwaggerUI to create this documentation.
      </Typography>
    </>
  );
};
