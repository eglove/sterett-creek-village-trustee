import { useRouter } from 'blitz';

import Layout from '../../layouts/components/layout';
import { SignUpForm } from '../components/sign-up-form';

const SignUp = (): JSX.Element => {
  const router = useRouter();

  return (
    <SignUpForm
      onSuccess={async (): Promise<boolean> => {
        return router.push('/');
      }}
    />
  );
};

SignUp.suppressFirstRenderFlicker = true;
SignUp.redirectAuthenticatedTo = '/';
SignUp.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Sign Up">{page}</Layout>;
};

export default SignUp;
