import { Factory } from 'lib/factory';

import { assertNotNull } from 'lib/assert-not-null';
import { validate } from 'lib/validate';
import { User, UserCreateProps } from 'user/domain/user';

export const UserFactory = new Factory<User, UserCreateProps>((data) => {
  assertNotNull(data);
  const user = new User(data);
  validate(user);
  return user;
});
