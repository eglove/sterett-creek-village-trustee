import { resolver } from 'blitz';
import db from 'db';

import { UploadCovenant } from '../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UploadCovenant),
  async ({ cloudinaryId, url, width, height, title }) => {
    return db.covenant.create({
      data: {
        cloudinaryId,
        height,
        title,
        url,
        width,
      },
      select: {
        id: true,
      },
    });
  }
);
