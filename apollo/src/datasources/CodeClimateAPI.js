const { RESTDataSource } = require('apollo-datasource-rest');

// Better than axios? Due to having caching of data, and making sure requests aren't duplicated.
class CodeClimateAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.codeclimate.com/v1/';
    this.token = 'Token token=673794749dacb6da2c2a4b5212d6202f7bc6b4b3';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.token);
  }

  // REMEMBER: You must JSON.parse() the data returned from these requests.

  getRepobyID = async repoId => JSON.parse(await this.get(`repos/${repoId}`));

  getRepobyGHSlug = async slug =>
    JSON.parse(await this.get(`repos?github_slug=${slug}`));

  getSnapshot = async (repoId, snapshotId) =>
    JSON.parse(await this.get(`repos/${repoId}/snapshots/${snapshotId}`));

  //1. move CodeClimate API calls OUT OF Query resolver into CodeClimateAPI Class
  //2. refactor server calls?

  //******GENERAL NOTES/THOUGHTS/IDEAS *******/
  //map codeclimate api data to a reducers similar to spacex tutorial && and Robert mapped
  //two reducers for now: CodeClimate type, Repository Type
  //CHALLENGE --> making this work with Prisma database access --> Apollo tutorials DON'T use Prisma

  //************ IDEALLY WE WANT MAPPED DATA TO LOOK SIMILAR TO BELOW ***********/
  /* 
  reducerCodeCLimate(){
    return{
      id: repoId
      grade: data.attributes.ratings[0].letter
    }
  }

  reducerRepository(){
    return{
      id:
      name:
      CCId:
    }
  }
  */
} //end of CodeClimateAPI class

module.exports = CodeClimateAPI;
