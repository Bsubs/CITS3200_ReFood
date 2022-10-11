/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      channelID
      author
      body
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        channelID
        author
        body
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
export const syncMessages = /* GraphQL */ `
  query SyncMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        channelID
        author
        body
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
export const getFOODITEM = /* GraphQL */ `
  query GetFOODITEM($id: ID!) {
    getFOODITEM(id: $id) {
      id
      title
      pickup_date
      category
      transport_reqs
      picture
      donorID
      nfpID
      pickup_location
      quantity
      description
      isCompleted
      completionDate
      start_time
      end_time
      donorName
      donorPhone
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
        category
        transport_reqs
        picture
        donorID
        nfpID
        pickup_location
        quantity
        description
        isCompleted
        completionDate
        start_time
        end_time
        donorName
        donorPhone
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
        category
        transport_reqs
        picture
        donorID
        nfpID
        pickup_location
        quantity
        description
        isCompleted
        completionDate
        start_time
        end_time
        donorName
        donorPhone
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
