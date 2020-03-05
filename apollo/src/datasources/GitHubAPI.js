const { GraphQLDataSource } = require('apollo-datasource-graphql');
const { gql } = require('apollo-server');

const REPOSBYORG = gql`
    query Github($dynamicQuery: String!){
        search(query: $dynamicQuery , type: REPOSITORY, first: 100) {
            edges{
                node{
                    ... on Repository{
                        name
                        id
                        owner{
                            id
                            login
                        }
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
        token = 'bearer 547f23ba9d02cc653f0e8938d3f27e68c8d30a80';

    willSendRequest(request) {

        if(!request.headers) {
            request.headers = {};
        }
        
        request.headers.Authorization = `${this.token}`

    }


    async getReposByOrg(dynamicQuery) {
        console.log(dynamicQuery);
        try {
            const res = await this.query(REPOSBYORG, {
                variables: {
                    dynamicQuery
                },
              });
            console.log(res.data.search.edges);
            // console.log(res.data.search.edges[0].node.owner.login)
        }
        catch(err){
            console.log(err, "I am the error.");
        }
    }
}

module.exports = GitHubAPI;