const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { repoByOrgReducer } = require('./reducers/GitHubReducer');
const { REPOSBYORG } = require('./queries/GitHubQueries');


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
