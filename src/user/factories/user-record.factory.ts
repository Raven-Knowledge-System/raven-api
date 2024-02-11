import { Factory } from 'lib/factory';

import { assertNotNull } from 'lib/assert-not-null';
import { validate } from 'lib/validate';
import { UserRecord } from 'user/infra/db/tables/user.table-definition';

export const UserRecordFactory = new Factory<UserRecord>((data) => {
  assertNotNull(data);
  const user = new UserRecord(data);
  validate(user);
  return user;
});
