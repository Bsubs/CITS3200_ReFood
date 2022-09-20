import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type FOODITEMMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<FOODITEM, FOODITEMMetaData>);
  static copyOf(source: FOODITEM, mutator: (draft: MutableModel<FOODITEM, FOODITEMMetaData>) => MutableModel<FOODITEM, FOODITEMMetaData> | void): FOODITEM;
}