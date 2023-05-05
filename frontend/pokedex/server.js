import express from 'express';
import expressGraphQL from 'express-graphql'
// expressGraphQL.graphqlHTTP()

console.log('expressGraphQL log:')
console.log(expressGraphQL)

const app = express()

app.use('/graphql', expressGraphQL.graphqlHTTP({
    // schema: schema,
    graphiql: true
}))


app.listen(3333, () => console.log('listen to server; server listen to you'));

