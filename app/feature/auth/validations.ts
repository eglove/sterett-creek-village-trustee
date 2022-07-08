import { z } from 'zod';

export const EmailSchema = z
  .string()
  .email()
  .transform(string => {
    return string.toLowerCase().trim();
  });

export const PasswordSchema = z
  .string()
  .min(10)
  .max(100)
  .transform(string => {
    return string.trim();
  });

export const ChangePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: PasswordSchema,
});

export const ForgotPasswordSchema = z.object({
  email: EmailSchema,
});

export const ResetPasswordSchema = z
  .object({
    confirmPassword: PasswordSchema,
    password: PasswordSchema,
    token: z.string(),
  })
  .refine(
    data => {
      return data.password === data.confirmPassword;
    },
    {
      message: `Passwords don't match`,
      path: ['confirmPassword'],
    }
  );

export const SignInSchema = z.object({
  email: EmailSchema,
  password: z.string(),
});

export const SignUpSchema = z
  .object({
    confirmPassword: PasswordSchema,
    email: EmailSchema,
    password: PasswordSchema,
  })
  .refine(
    data => {
      return data.password === data.confirmPassword;
    },
    { message: `Passwords don't match`, path: ['confirmPassword'] }
  );
