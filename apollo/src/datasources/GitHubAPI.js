const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql } = require('apollo-server');

const REPOSBYORG = gql`
    query{
        search(query:"mission org:Lambda-School-Labs", type: REPOSITORY, first: 100) {
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

const TEST = gql`
    query{
        viewer{
            login
        }
    }
`
// make mission and org dynamic--later

class GitHubAPI extends GraphQLDataSource{
        baseURL = 'https://api.github.com/graphql';
        token = 'bearer 7b257815bbc6b263d0ea6a9175b52847fe888524';

    willSendRequest(request) {

        if(!request.headers) {
            request.headers = {};
        }
        
        request.headers.Authorization = `${this.token}`

    }


    async getReposByOrg () {
        try {
            const res = await this.query(REPOSBYORG);
            console.log(res.data.search.edges);
        }
        catch(err){
            console.log(err, "I am the error.");
        }
    }
}

module.exports = GitHubAPI;