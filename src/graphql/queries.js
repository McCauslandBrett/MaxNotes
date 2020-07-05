/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMaxes = /* GraphQL */ `
  query GetMaxes($id: ID!) {
    getMaxes(id: $id) {
      id
      email
      bench
      squat
      deadlift
      clean
      snatch
      createdAt
      updatedAt
    }
  }
`;
export const listMaxess = /* GraphQL */ `
  query ListMaxess(
    $filter: ModelMaxesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMaxess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        bench
        squat
        deadlift
        clean
        snatch
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
