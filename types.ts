import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from 'blitz';
import { User } from 'db';

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = 'ADMIN' | 'USER';

declare module 'blitz' {
  export interface Ctx extends DefaultCtx {
    session: SessionContext;
  }
  export interface Session {
    PublicData: {
      role: Role;
      userId: User['id'];
    };
    isAuthorized: SimpleRolesIsAuthorized<Role>;
  }
}
