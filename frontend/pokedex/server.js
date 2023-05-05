import express from 'express';
import expressGraphQL from 'express-graphql'   // expressGraphQL returns an object with functions to execute 
import { GraphQLSchema, GraphQLObjectType, GraphQLString, } from 'graphql'
const app = express()

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Hello', 
        fields: () => ({
            message: { 
                type: GraphQLString, 
                resolve: ()=> 'Hey You Guys!' 
            }

        })
    })
})

app.use('/graphql', expressGraphQL.graphqlHTTP({  // used to need expressGraphQL( { graphiql: true }) --> now its expressGraphQL.graphqlHTTP
    // schema: schema,
    graphiql: true
}))


app.listen(3333, () => console.log('listen to server; server listen to you'));

