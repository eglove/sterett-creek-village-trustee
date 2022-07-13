import { isValidPhoneNumber } from '@ethang/utilities';
import { z } from 'zod';

import { IdSchema } from '../../../../validations';
import { imageValidations } from '../image/image-validations';

export const CreateTrusteeSchema = z
  .object({
    duties: z.array(z.string()),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string().refine(data => {
      return isValidPhoneNumber(data);
    }),
  })
  .merge(imageValidations);

export const UpdateTrusteeSchema =
  CreateTrusteeSchema.partial().merge(IdSchema);
