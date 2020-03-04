import { GraphQLDataSource } from 'apollo-datasource-graphql';
import { gql } from 'apollo-server'

const FIRST_QUERY = gql`

`

export class GitHubAPI extends GraphQLDataSource{
    baseURL = '';
}
