import { resolver } from 'blitz';
import Cloudinary from 'cloudinary';

import { IdSchema } from '../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(IdSchema),
  async ({ id }) => {
    const cloudinary = Cloudinary.v2;

    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });

    return cloudinary.uploader.destroy(id);
  }
);
