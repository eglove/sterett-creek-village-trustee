import { resolver } from 'blitz';
import db from 'db';

import { UploadMeetingMinutes } from '../../validations/meeting-minutes/meeting-minutes-validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UploadMeetingMinutes),
  async data => {
    return db.meetingMinute.create({
      data,
      select: {
        id: true,
      },
    });
  }
);
