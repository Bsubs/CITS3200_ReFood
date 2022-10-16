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
      }
      nextToken
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
      }
      nextToken
    }
  }
`;
export const getFavouritesTable = /* GraphQL */ `
  query GetFavouritesTable($id: ID!) {
    getFavouritesTable(id: $id) {
      id
      userID
      donationID
    }
  }
`;
export const listFavouritesTables = /* GraphQL */ `
  query ListFavouritesTables(
    $filter: TableFavouritesTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavouritesTables(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        donationID
      }
      nextToken
    }
  }
`;
