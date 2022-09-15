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
export const updateFOODITEM = /* GraphQL */ `
  mutation UpdateFOODITEM(
    $input: UpdateFOODITEMInput!
    $condition: ModelFOODITEMConditionInput
  ) {
    updateFOODITEM(input: $input, condition: $condition) {
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
export const deleteFOODITEM = /* GraphQL */ `
  mutation DeleteFOODITEM(
    $input: DeleteFOODITEMInput!
    $condition: ModelFOODITEMConditionInput
  ) {
    deleteFOODITEM(input: $input, condition: $condition) {
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
export const createDONOR = /* GraphQL */ `
  mutation CreateDONOR(
    $input: CreateDONORInput!
    $condition: ModelDONORConditionInput
  ) {
    createDONOR(input: $input, condition: $condition) {
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
export const updateDONOR = /* GraphQL */ `
  mutation UpdateDONOR(
    $input: UpdateDONORInput!
    $condition: ModelDONORConditionInput
  ) {
    updateDONOR(input: $input, condition: $condition) {
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
export const deleteDONOR = /* GraphQL */ `
  mutation DeleteDONOR(
    $input: DeleteDONORInput!
    $condition: ModelDONORConditionInput
  ) {
    deleteDONOR(input: $input, condition: $condition) {
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
export const createNFP = /* GraphQL */ `
  mutation CreateNFP(
    $input: CreateNFPInput!
    $condition: ModelNFPConditionInput
  ) {
    createNFP(input: $input, condition: $condition) {
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
export const updateNFP = /* GraphQL */ `
  mutation UpdateNFP(
    $input: UpdateNFPInput!
    $condition: ModelNFPConditionInput
  ) {
    updateNFP(input: $input, condition: $condition) {
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
export const deleteNFP = /* GraphQL */ `
  mutation DeleteNFP(
    $input: DeleteNFPInput!
    $condition: ModelNFPConditionInput
  ) {
    deleteNFP(input: $input, condition: $condition) {
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
