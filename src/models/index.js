// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FOODITEM, DONOR, NFP } = initSchema(schema);

export {
  FOODITEM,
  DONOR,
  NFP
};