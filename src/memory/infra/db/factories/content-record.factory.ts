import { Factory } from 'lib/factory';

import { assertNotNull } from 'lib/assert-not-null';
import { validate } from 'lib/validate';
import { ContentRecord } from '../tables/content.table-definition';

export const ContentRecordFactory = new Factory<ContentRecord>((data) => {
  assertNotNull(data);
  const content = new ContentRecord(data);
  validate(content);
  return content;
});
