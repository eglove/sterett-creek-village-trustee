import { resolver } from 'blitz';
import Cloudinary from 'cloudinary';
import db from 'db';

import { IdSchema } from '../../../../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(IdSchema),
  async ({ id }) => {
    const cloudinary = Cloudinary.v2;

    // TODO create cloudinary delete endpoint
    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });

    const homeImage = await db.homeImage.delete({
      select: {
        cloudinaryId: true,
        id: true,
      },
      where: {
        id,
      },
    });

    await cloudinary.uploader.destroy(homeImage.cloudinaryId);

    return { id: homeImage.id };
  }
);
