const { RESTDataSource } = require('apollo-datasource-rest');

class CodeClimateAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.codeclimate.com/v1/';
    this.getRepobyGHSlug = this.getRepobyGHSlug.bind(this)
  }

  getRepobyGHSlug(slug) {
    return this.get(`repos?github_slug=${slug}`);
  } 
}

module.exports = CodeClimateAPI;
