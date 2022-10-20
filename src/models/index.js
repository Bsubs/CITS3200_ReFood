// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FavouritesTable, Message, FOODITEM } = initSchema(schema);

export {
  FavouritesTable,
  Message,
  FOODITEM
};