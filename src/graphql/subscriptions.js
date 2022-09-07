/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFOODITEM = /* GraphQL */ `
  subscription OnCreateFOODITEM {
    onCreateFOODITEM {
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
export const onUpdateFOODITEM = /* GraphQL */ `
  subscription OnUpdateFOODITEM {
    onUpdateFOODITEM {
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
export const onDeleteFOODITEM = /* GraphQL */ `
  subscription OnDeleteFOODITEM {
    onDeleteFOODITEM {
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
export const onCreateDONOR = /* GraphQL */ `
  subscription OnCreateDONOR {
    onCreateDONOR {
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
export const onUpdateDONOR = /* GraphQL */ `
  subscription OnUpdateDONOR {
    onUpdateDONOR {
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
export const onDeleteDONOR = /* GraphQL */ `
  subscription OnDeleteDONOR {
    onDeleteDONOR {
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
export const onCreateNFP = /* GraphQL */ `
  subscription OnCreateNFP {
    onCreateNFP {
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
export const onUpdateNFP = /* GraphQL */ `
  subscription OnUpdateNFP {
    onUpdateNFP {
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
export const onDeleteNFP = /* GraphQL */ `
  subscription OnDeleteNFP {
    onDeleteNFP {
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
