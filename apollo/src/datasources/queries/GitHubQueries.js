const { gql } = require('apollo-server');

const REPOS_BY_ORG = gql`
  query Github($dynamicQuery: String!) {
    search(query: $dynamicQuery, type: REPOSITORY, first: 15) {
      edges {
        node {
          ... on Repository {
            name
            id
            owner {
              id
              login
            }
          }
        }
      }
    }
  }
`;

const SPARKLINE = gql`
  query Github($owner: String!, $name: String!){
    repository(owner: $owner, name: $name){ 
      defaultBranchRef{
        name
        target {
          ... on Commit {
            history(first: 100){
              nodes{
                oid
                message
                additions
                deletions
                changedFiles
                committedDate
              }
            }
          }
        }
      } 
    }
  }
`;

//query for sparkline data points by date, need to set args/date to dynamic
const SPARKLINE_BY_DATE = gql`
  query Github($owner: String!, $name: String!, $until: String!) { 
    repository(owner: $owner, name: $name){
      defaultBranchRef{
        name
        target{
          ... on Commit {
            history(until: $until){
              nodes{
                oid
                message
                additions
                deletions
                changedFiles
                committedDate
              }
            }
          }
        }
      }
    }
  }
`;

module.exports = { REPOS_BY_ORG, SPARKLINE, SPARKLINE_BY_DATE };