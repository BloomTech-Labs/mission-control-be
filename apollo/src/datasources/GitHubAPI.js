const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql } = require('apollo-server');

const REPOSBYORG = gql`
    query{
        search(query: "mission org: Lambda-School-Labs", type: REPOSITORY, first: 100) {
            edges{
                node{
                    ... on Repository{
                        name
                        isFork
                    }
                }
            }
        }
    }
`;
// make mission and org dynamic--later

class GitHubAPI extends GraphQLDataSource{
        baseURL = 'https://api.github.com/graphql';
        token = 'bearer 7f5979869999ee33900e8ac44edbadc13c211019';

    willSendRequest(request) {
        const { accessToken } = this.token;
    
        console.log(this.token);

        if(!request.http.headers) {
            request.http.headers = {};
        }
        
        request.http.headers.set('Authorization', accessToken);
    }

    async getReposByOrg () {
        console.log("hewwo uwu senpai");
        try {
            const res = await this.query(REPOSBYORG);
            console.log(res);
        }
        catch(err){
            console.log(err, "I am the error.");
        }
    }
}


module.exports = GitHubAPI;