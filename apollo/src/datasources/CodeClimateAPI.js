const { RESTDataSource } = require('apollo-datasource-rest');
const { orgsReducer, repoReducer, snapshotReducer } = require('./reducers/CodeClimateReducers')

class CodeClimateAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.CODE_CLIMATE_API}`;
    this.token = `Token token=${process.env.CODE_CLIMATE_TOKEN}`;
  }

  willSendRequest(request) { //Different procedure to send/set headers in a GQLDataSource vs RESTDataSource
    request.headers.set('Authorization', this.token);
  }

  //ALL responses from CodeClimate API must be parsed into JSON  
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
