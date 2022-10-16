/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      channelID
      author
      body
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      channelID
      author
      body
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      channelID
      author
      body
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFOODITEM = /* GraphQL */ `
  subscription OnCreateFOODITEM {
    onCreateFOODITEM {
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
export const onUpdateFOODITEM = /* GraphQL */ `
  subscription OnUpdateFOODITEM {
    onUpdateFOODITEM {
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
export const onDeleteFOODITEM = /* GraphQL */ `
  subscription OnDeleteFOODITEM {
    onDeleteFOODITEM {
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
export const onCreateFavouritesTable = /* GraphQL */ `
  subscription OnCreateFavouritesTable(
    $id: ID
    $userID: String
    $donationID: String
  ) {
    onCreateFavouritesTable(id: $id, userID: $userID, donationID: $donationID) {
      id
      userID
      donationID
    }
  }
`;
export const onUpdateFavouritesTable = /* GraphQL */ `
  subscription OnUpdateFavouritesTable(
    $id: ID
    $userID: String
    $donationID: String
  ) {
    onUpdateFavouritesTable(id: $id, userID: $userID, donationID: $donationID) {
      id
      userID
      donationID
    }
  }
`;
export const onDeleteFavouritesTable = /* GraphQL */ `
  subscription OnDeleteFavouritesTable(
    $id: ID
    $userID: String
    $donationID: String
  ) {
    onDeleteFavouritesTable(id: $id, userID: $userID, donationID: $donationID) {
      id
      userID
      donationID
    }
  }
`;
