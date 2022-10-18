// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Message, FavouritesTable, FOODITEM } = initSchema(schema);

export {
  Message,
  FavouritesTable,
  FOODITEM
};