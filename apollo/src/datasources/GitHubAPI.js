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
`

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
}

module.exports = GitHubAPI;
