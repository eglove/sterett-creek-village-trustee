import { BlitzPage } from 'blitz';

import Layout from '../../layouts/components/layout';
import { ResetPasswordForm } from '../components/reset-password-form';

const ResetPassword: BlitzPage = () => {
  return <ResetPasswordForm />;
};

ResetPassword.redirectAuthenticatedTo = '/';
ResetPassword.suppressFirstRenderFlicker = true;
ResetPassword.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Reset Your Password">{page}</Layout>;
};

export default ResetPassword;
