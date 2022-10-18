import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FavouritesTableMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FOODITEMMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Message {
  readonly id: string;
  readonly channelID?: string | null;
  readonly author?: string | null;
  readonly body?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class FavouritesTable {
  readonly id: string;
  readonly userID?: string | null;
  readonly donationID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<FavouritesTable, FavouritesTableMetaData>);
  static copyOf(source: FavouritesTable, mutator: (draft: MutableModel<FavouritesTable, FavouritesTableMetaData>) => MutableModel<FavouritesTable, FavouritesTableMetaData> | void): FavouritesTable;
}

export declare class FOODITEM {
  readonly id: string;
  readonly title?: string | null;
  readonly pickup_date?: string | null;
  readonly category?: string | null;
  readonly transport_reqs?: string | null;
  readonly picture?: string | null;
  readonly donorID?: string | null;
  readonly nfpID?: string | null;
  readonly pickup_location?: string | null;
  readonly quantity?: string | null;
  readonly description?: string | null;
  readonly isCompleted?: boolean | null;
  readonly completionDate?: string | null;
  readonly start_time?: string | null;
  readonly end_time?: string | null;
  readonly donorName?: string | null;
  readonly donorPhone?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<FOODITEM, FOODITEMMetaData>);
  static copyOf(source: FOODITEM, mutator: (draft: MutableModel<FOODITEM, FOODITEMMetaData>) => MutableModel<FOODITEM, FOODITEMMetaData> | void): FOODITEM;
}