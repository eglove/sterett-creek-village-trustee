import { useQuery } from 'blitz';

import getCurrentUser, { CurrentUser } from '../queries/get-current-user';

export const useCurrentUser = (): CurrentUser | undefined => {
  const [user] = useQuery(getCurrentUser, undefined, { suspense: false });
  return user ?? undefined;
};
