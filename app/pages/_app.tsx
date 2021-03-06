import '../styles/nprogress.css';
import '@trussworks/react-uswds/lib/uswds.css';
import '@trussworks/react-uswds/lib/index.css';
import '../styles/global.css';

import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from 'blitz';
import { Router } from 'next/router';
import NProgress from 'nprogress';

import { SignInForm } from '../feature/auth/components/sign-in-form';

Router.events.on('routeChangeStart', () => {
  return NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  return NProgress.done();
});
Router.events.on('routeChangeError', () => {
  return NProgress.done();
});

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const getLayout =
    Component.getLayout ??
    ((page: JSX.Element): JSX.Element => {
      return page;
    });

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  );
};

const RootErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps): JSX.Element => {
  if (error instanceof AuthenticationError) {
    return <SignInForm onSuccess={resetErrorBoundary} />;
  }

  if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  }

  const statusCode = error.statusCode as number | undefined;

  return (
    <ErrorComponent
      statusCode={statusCode ?? 400}
      title={error.message ?? error.name}
    />
  );
};

export default App;
