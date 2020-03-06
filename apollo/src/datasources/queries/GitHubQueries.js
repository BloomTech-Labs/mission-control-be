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

//Query for sparkline data points, need to set to dynamic arguments
const SPARKLINE = gql`
  query{
    repository(owner: "Lambda-School-Labs", name: "mission-control-be"){ 
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
  query { 
    repository(owner:"Lambda-School-Labs", name:"mission-control-be"){
      defaultBranchRef{
        name
        target{
          ... on Commit {
            history(until: "2020-03-01T01:01:00"){
              nodes{
                additions
                deletions
                changedFiles
                committedDate
                committer {
                  date
                  email
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

module.exports = { REPOS_BY_ORG, SPARKLINE, SPARKLINE_BY_DATE };