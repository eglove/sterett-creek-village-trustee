import { resolver } from 'blitz';
import db from 'db';

import { UpdateMeetingMinutesTitleSchema } from '../../validations/meeting-minutes/meeting-minutes-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateMeetingMinutesTitleSchema),
  async ({ id, title }) => {
    return db.meetingMinute.update({
      data: {
        title,
      },
      select: {
        id: true,
      },
      where: {
        id,
      },
    });
  }
);
