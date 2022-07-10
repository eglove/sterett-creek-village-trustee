import Layout from '../../layouts/components/layout';
import { ForgotPasswordForm } from '../components/forgot-password-form';

const ForgotPassword = (): JSX.Element => {
  return <ForgotPasswordForm />;
};

ForgotPassword.redirectAuthenticatedTo = '/';
ForgotPassword.suppressFirstRenderFlicker = true;
ForgotPassword.getLayout = (page: JSX.Element): JSX.Element => {
  return <Layout title="Forgot Your Password?">{page}</Layout>;
};

export default ForgotPassword;
