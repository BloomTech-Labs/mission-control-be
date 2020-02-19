const { RESTDataSource } = require('apollo-datasource-rest');

class CodeClimateAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.codeclimate.com/v1/'
  }

    getGrade = async repoId => {
        const response = await this.get(`repos/${repoId}`)
        console.log(response)
        return response
    }
}



module.exports = CodeClimateAPI;