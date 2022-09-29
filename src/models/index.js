// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Message, FOODITEM } = initSchema(schema);

export {
  Message,
  FOODITEM
};