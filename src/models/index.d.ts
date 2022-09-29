import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FOODITEMMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Message {
  readonly id: string;
  readonly channelID?: string | null;
  readonly autho?: string | null;
  readonly body?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<FOODITEM, FOODITEMMetaData>);
  static copyOf(source: FOODITEM, mutator: (draft: MutableModel<FOODITEM, FOODITEMMetaData>) => MutableModel<FOODITEM, FOODITEMMetaData> | void): FOODITEM;
}