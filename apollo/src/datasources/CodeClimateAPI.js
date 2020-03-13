const { RESTDataSource } = require('apollo-datasource-rest');
const { orgsReducer, repoReducer, snapshotReducer } = require('./reducers/CodeClimateReducers')

class CodeClimateAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.codeclimate.com/v1/';
    this.token = 'Token token=673794749dacb6da2c2a4b5212d6202f7bc6b4b3';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.token);
  }

  getRepobyID = async repoId => JSON.parse(await this.get(`repos/${repoId}`));

  getRepobyGHSlug = async slug =>
    JSON.parse(await this.get(`repos?github_slug=${slug}`));

  getSnapshot = async (repoId, snapshotId) => {
    const res = JSON.parse(await this.get(`repos/${repoId}/snapshots/${snapshotId}`));
    return snapshotReducer(res.data)
  }
    

  async getAllOrgs() {
    const query = `orgs`
    const res = JSON.parse(await this.get(query));
    return Array.isArray(res.data)
      ? 
        res.data.map(org => orgsReducer(org))
      
      : [];
  }

  async getAllRepos( {productName: productArg} ) {
      const query = `orgs/${orgArg}/repos`
      const res = JSON.parse(await this.get(query))
      return Array.isArray(res.data)
      ? 
          res.data.map(repo => repoReducer(repo))
      
      : [];
  }

}

module.exports = CodeClimateAPI;
