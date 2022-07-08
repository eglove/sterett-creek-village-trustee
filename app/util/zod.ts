import { ZodError } from 'zod';

export const getZodFieldErrors = (
  zodError: ZodError,
  formState: Object
): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};

  for (const key of Object.keys(formState)) {
    const errorArray = zodError.formErrors.fieldErrors[key];

    if (typeof errorArray !== 'undefined') {
      errors[key] = errorArray;
    }
  }

  return errors;
};
