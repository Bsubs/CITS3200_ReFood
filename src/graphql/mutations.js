/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      channelID
      autho
      body
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      channelID
      autho
      body
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      channelID
      autho
      body
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createFOODITEM = /* GraphQL */ `
  mutation CreateFOODITEM(
    $input: CreateFOODITEMInput!
    $condition: ModelFOODITEMConditionInput
  ) {
    createFOODITEM(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateFOODITEM = /* GraphQL */ `
  mutation UpdateFOODITEM(
    $input: UpdateFOODITEMInput!
    $condition: ModelFOODITEMConditionInput
  ) {
    updateFOODITEM(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteFOODITEM = /* GraphQL */ `
  mutation DeleteFOODITEM(
    $input: DeleteFOODITEMInput!
    $condition: ModelFOODITEMConditionInput
  ) {
    deleteFOODITEM(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
