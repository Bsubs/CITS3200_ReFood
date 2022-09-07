/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFOODITEM = /* GraphQL */ `
  query GetFOODITEM($id: ID!) {
    getFOODITEM(id: $id) {
      id
      title
      pickup_date
      pickup_time
      category
      quantity
      expiry_date
      transport_reqs
      picture
      nfpID
      donorID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listFOODITEMS = /* GraphQL */ `
  query ListFOODITEMS(
    $filter: ModelFOODITEMFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFOODITEMS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        pickup_date
        pickup_time
        category
        quantity
        expiry_date
        transport_reqs
        picture
        nfpID
        donorID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncFOODITEMS = /* GraphQL */ `
  query SyncFOODITEMS(
    $filter: ModelFOODITEMFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFOODITEMS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        pickup_date
        pickup_time
        category
        quantity
        expiry_date
        transport_reqs
        picture
        nfpID
        donorID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getDONOR = /* GraphQL */ `
  query GetDONOR($id: ID!) {
    getDONOR(id: $id) {
      id
      email
      password
      business_name
      type
      abn
      contact_number
      address
      FOODITEMS {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listDONORS = /* GraphQL */ `
  query ListDONORS(
    $filter: ModelDONORFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDONORS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        password
        business_name
        type
        abn
        contact_number
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDONORS = /* GraphQL */ `
  query SyncDONORS(
    $filter: ModelDONORFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDONORS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        email
        password
        business_name
        type
        abn
        contact_number
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getNFP = /* GraphQL */ `
  query GetNFP($id: ID!) {
    getNFP(id: $id) {
      id
      email
      password
      org_name
      type
      registered_charity
      abn
      contact_number
      address
      FOODITEMS {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listNFPS = /* GraphQL */ `
  query ListNFPS(
    $filter: ModelNFPFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNFPS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        password
        org_name
        type
        registered_charity
        abn
        contact_number
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNFPS = /* GraphQL */ `
  query SyncNFPS(
    $filter: ModelNFPFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNFPS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        email
        password
        org_name
        type
        registered_charity
        abn
        contact_number
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
