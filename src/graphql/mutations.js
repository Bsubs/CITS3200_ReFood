/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
