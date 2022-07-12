import { shuffleArray } from '@ethang/utilities';
import { resolver } from 'blitz';
import db from 'db';

export default resolver.pipe(async () => {
  const images = await db.homeImage.findMany({
    select: {
      description: true,
      height: true,
      id: true,
      url: true,
      width: true,
    },
  });

  return shuffleArray(images);
});
