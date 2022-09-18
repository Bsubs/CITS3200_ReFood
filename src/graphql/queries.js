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
      donorID
      nfpID
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
        donorID
        nfpID
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
        donorID
        nfpID
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
