import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type FOODITEMMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DONORMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NFPMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class FOODITEM {
  readonly id: string;
  readonly title?: string | null;
  readonly pickup_date?: string | null;
  readonly pickup_time?: string | null;
  readonly category?: string | null;
  readonly quantity?: number | null;
  readonly expiry_date?: string | null;
  readonly transport_reqs?: string | null;
  readonly picture?: string | null;
  readonly nfpID: string;
  readonly donorID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<FOODITEM, FOODITEMMetaData>);
  static copyOf(source: FOODITEM, mutator: (draft: MutableModel<FOODITEM, FOODITEMMetaData>) => MutableModel<FOODITEM, FOODITEMMetaData> | void): FOODITEM;
}

export declare class DONOR {
  readonly id: string;
  readonly email?: string | null;
  readonly password?: string | null;
  readonly business_name?: string | null;
  readonly type?: string | null;
  readonly abn?: number | null;
  readonly contact_number?: string | null;
  readonly address?: string | null;
  readonly FOODITEMS?: (FOODITEM | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<DONOR, DONORMetaData>);
  static copyOf(source: DONOR, mutator: (draft: MutableModel<DONOR, DONORMetaData>) => MutableModel<DONOR, DONORMetaData> | void): DONOR;
}

export declare class NFP {
  readonly id: string;
  readonly email?: string | null;
  readonly password?: string | null;
  readonly org_name?: string | null;
  readonly type?: string | null;
  readonly registered_charity?: boolean | null;
  readonly abn?: number | null;
  readonly contact_number?: string | null;
  readonly address?: string | null;
  readonly FOODITEMS?: (FOODITEM | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<NFP, NFPMetaData>);
  static copyOf(source: NFP, mutator: (draft: MutableModel<NFP, NFPMetaData>) => MutableModel<NFP, NFPMetaData> | void): NFP;
}