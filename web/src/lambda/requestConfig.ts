const {
  SHOPIFY_TOKEN,
  SHOPIFY_GRAPHQL_URL
} = process.env

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
}

const shopifyConfig = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN
}

const CUSTOMER_ADDRESS_QUERY = `
  firstName
  lastName
  address1
  address2
  company
  phone
  city
  country
  province
  zip
`

const CUSTOMER_QUERY = `query customerQuery($customerAccessToken: String!){
  customer(customerAccessToken: $customerAccessToken) {
    firstName
    lastName
    acceptsMarketing
    phone
    email
    defaultAddress {
      ${CUSTOMER_ADDRESS_QUERY}
    }
    orders(first:100){
      edges{
        node{
          orderNumber
          totalPrice
          processedAt
          statusUrl
          successfulFulfillments(first: 100){
            trackingInfo(first: 100){
              number
              url
            }
          }
          lineItems(first:100){
            edges{
              node{
                quantity
                title
                variant{
                  title
                  price
                  image{
                    originalSrc
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`

const CUSTOMER_TOKEN_QUERY = `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    userErrors {
      field
      message
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
  }
}
`
const CUSTOMER_RECOVERY_QUERY = `mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    userErrors {
      field
      message
    }
  }
}`

const CUSTOMER_LOGOUT_QUERY = `mutation customerAccessTokenDelete($customerAccessToken: String!) {
  customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
    userErrors {
      field
      message
    }
    deletedAccessToken
    deletedCustomerAccessTokenId
  }
}`

const CUSTOMER_CREATE_QUERY = `mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    userErrors {
      field
      message
    }
    customer {
      id
    }
    customerUserErrors {
      field
      message
    }
  }
}`

const CUSTOMER_RESET_QUERY = `mutation customerReset($id: ID!, $input: CustomerResetInput!) {
  customerReset(id: $id, input: $input) {
    userErrors {
      field
      message
    }
    customer {
      email
    }
  }
}`

const CUSTOMER_ACTIVATE_QUERY = `mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
  customerActivate(id: $id, input: $input) {
    userErrors {
      field
      message
    }
    customer {
      email
    }
  }
}`

const statusReturn = (code: number, body: {}) => {
  return {
    statusCode: code,
    headers,
    body: JSON.stringify(body)
  }
}

const preparePayload = (query, v: {}) => {
  return {
    query,
    variables: v
  }
}

export {
  headers,
  shopifyConfig,
  statusReturn,
  preparePayload,
  SHOPIFY_GRAPHQL_URL,
  CUSTOMER_QUERY,
  CUSTOMER_RECOVERY_QUERY,
  CUSTOMER_TOKEN_QUERY,
  CUSTOMER_LOGOUT_QUERY,
  CUSTOMER_CREATE_QUERY,
  CUSTOMER_RESET_QUERY,
  CUSTOMER_ACTIVATE_QUERY
}