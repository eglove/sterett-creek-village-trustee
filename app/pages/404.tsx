import { ErrorComponent, Head } from 'blitz';

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
const Page404 = (): JSX.Element => {
  const statusCode = 404;
  const title = 'This page could not be found';
  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <ErrorComponent statusCode={statusCode} title={title} />
    </>
  );
};

export default Page404;
