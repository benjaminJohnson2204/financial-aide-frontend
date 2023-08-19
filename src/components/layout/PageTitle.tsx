import Head from 'next/head';

interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Head>
      <title>{`${title} - Financial Aide`}</title>
    </Head>
  );
};
