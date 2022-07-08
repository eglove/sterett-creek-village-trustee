import { useQuery } from 'blitz';

import getCurrentUser, { CurrentUser } from './queries/get-current-user';

export const useCurrentUser = (): CurrentUser | null => {
  const [user] = useQuery(getCurrentUser, undefined);
  return user;
};
