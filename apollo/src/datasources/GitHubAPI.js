const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql } = require('apollo-server');
const { repoByOrgReducer } = require('./reducers/GitHubReducer');

const REPOSBYORG = gql`
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


class GitHubAPI extends GraphQLDataSource {
  baseURL = 'https://api.github.com/graphql';
  token = 'bearer cdf9e6076522e639c93c493448b1f02bb403b94b'; //token needs to be updated to Lambda-School-Labs token

  willSendRequest(request) {
    if (!request.headers) {
      request.headers = {};
    }

    request.headers.Authorization = `${this.token}`;
  }

  async getReposByOrg(dynamicQuery) {
    try {
      const res = await this.query(REPOSBYORG, {
        variables: {
          dynamicQuery,
        },
      });
      return res.data.search.edges.map(repo => (
        repoByOrgReducer(repo)
      ));
    } catch (err) {
      console.log('getReposByOrg ERROR:', err);
    }
  }

  //use queries here, map over response and send to reducer
}

module.exports = GitHubAPI;
