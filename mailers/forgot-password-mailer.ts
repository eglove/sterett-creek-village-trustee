import { HTTP_METHOD, JSON_HEADER } from '@ethang/utilities';
import fetch from 'cross-fetch';

type ResetPasswordMailer = {
  to: string;
  token: string;
};

type ForgotPasswordMailerReturn = {
  send: () => Promise<void>;
};

export const forgotPasswordMailer = ({
  to,
  token,
}: ResetPasswordMailer): ForgotPasswordMailerReturn => {
  const origin =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.APP_ORIGIN ?? '';
  const resetUrl = `${origin}/reset-password?token=${token}`;

  return {
    async send(): Promise<void> {
      await fetch('https://api.postmarkapp.com/email', {
        body: JSON.stringify({
          From: process.env.POSTMARK_ADMIN_EMAIL ?? '',
          HtmlBody: `<h1>Reset Your Password</h1><p><a href="${resetUrl}">Click here to set a new password.</a></p>`,
          MessageStream: 'outbound',
          Subject:
            'Sterett Creek Village Trustee - Your Password Reset Instructions',
          TextBody: `Visit this link to set a new password: ${resetUrl}`,
          To: to,
        }),
        headers: {
          ...JSON_HEADER,
          'X-Postmark-Server-Token': process.env.POSTMARK_TOKEN ?? '',
        },
        method: HTTP_METHOD.POST,
      });
    },
  };
};
