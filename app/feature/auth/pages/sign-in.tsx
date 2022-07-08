import { BlitzPage, useRouter } from 'blitz';

import Layout from '../../layouts/components/layout';
import { SignInForm } from '../components/sign-in-form';

const SignIn: BlitzPage = () => {
  const router = useRouter();

  const handlePostRedirect = async (): Promise<void> => {
    const next =
      typeof router.query.next === 'undefined'
        ? '/'
        : decodeURIComponent(router.query.next as string);

    await router.push(next);
  };

  return <SignInForm onSuccess={handlePostRedirect} />;
};

SignIn.redirectAuthenticatedTo = '/';
SignIn.suppressFirstRenderFlicker = true;
SignIn.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Log In">{page}</Layout>;
};

export default SignIn;
