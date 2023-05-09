const express = require('express');
const path = require("path");
const cors = require('cors')
const axios = require("axios")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const dataRouter = require('./routes/data')
const anotherDataRouter = require('./routes/allPokemon')

// graphiql ----------> localhost:5000/graphql
const PORT = 5000;
const app = express();

const allPokemonAPI = async () => {
    console.log('prisma buddy')
    console.log(prisma)
    // let predata = await axios.get(`https://pokeapi.co/`);
    let bucket = []
    let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        let data = pokemon.data.results
        await data.forEach(data => bucket.push({name: data.name, id: bucket.length + 1 }))
        if (bucket) { return bucket }

// this array was taken from pokemondata.data.results    
// let array = [
//     {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'},
//     {name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/'},
//     {name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/'},
//     {name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/'},
//     {name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/'},
//     {name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/'},
//     {name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/'},
//     {name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/'},
//     {name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/'},
//     {name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/'},
//     {name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/'},
//     {name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/'},
//     {name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/'}
// ]
    
    // return array
    // return [{name: 'my'}, {name: 'good'}, {name: 'guy'}]
}

// middleware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);



const expressGraphQL = require('express-graphql').graphqlHTTP

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')

const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const pokemon = [
    { id: 1, name: 'bulbasaur' },
    { id: 2, name: 'ivysaur' },
    { id: 3, name: 'venusaur' },
    { id: 4, name: 'charmander' },
    { id: 5, name: 'charmeleon' },
    { id: 6, name: 'charizard' },
    { id: 7, name: 'squirtle' },
    { id: 8, name: 'wartortle' },
    { id: 9, name: 'blastoise' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find(author => author.id === book.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a author of a book',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter(book => book.authorId === author.id)
      }
    }
  })
})

const PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    description: "This is a pokemon with data populated from the API",
    fields: () => ({
        // id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: new GraphQLNonNull(GraphQLInt) } // I dont want it to be non nulled. it can be nulled to allow for quicker iteration of addPokemon
        
    })
})

// app.js ----->    const predata = await fetch(`http://localhost:5000/pokemon?query={test}`)
// localhost:5000/pokemon -----> app.use('/pokemon', expressGraphQL({      // pokemon is the first argument.
// query = {book, allbooks, allpokemon, test } query becomes: RootQueryType key that holds the resolve function.

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => books.find(book => book.id === args.id)
    },
    allbooks: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: () => books
    },
    allpokemon: {
        type: new GraphQLList(PokemonType),
        description: 'List of Pokemon',
        resolve: async () => {
            // let allpokemon = await allPokemonAPI()
            let bucket = []
    let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        let data = pokemon.data.results
        await data.forEach(data => bucket.push({name: data.name, id: bucket.length + 1 }))
        if (bucket) { return bucket }            
        }
    },
    test: {
        type: new GraphQLList(PokemonType),
        // type: GraphQLString,
        description: 'hit the route please',
        resolve: async () => {

           let bucket = [];
           let pokemon = await prisma.pokemon.findMany()
           pokemon.forEach( (pokemon) => {
            let obj = {name: pokemon.name, id: pokemon.id }
            bucket.push(obj);
           })
           return bucket;       

          //  return pokemon[0].name  // this returns the name           
        }
    },    
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: () => authors
    },
    author: {
      type: AuthorType,
      description: 'A Single Author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    hello: {
        type: GraphQLString,
        description: 'Hey guys',
        resolve: () => {
            return "Hello To ALL"
        }
    },
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
        books.push(book)
        return book
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name }
        authors.push(author)
        return author
      }
    },
    addPokemon: {
        type: PokemonType,
        description: 'Add a pokemon',
        args: {
            // arg to run condition against. With a strict equality match
            name: { type: GraphQLString },            
            // id: { type: GraphQLString}
        },
        resolve: (parent, args) => {
            const poke = { id: pokemon.length + 1, name: args.name }
        pokemon.push(poke)
        return poke
        }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})


    // http://localhost:5000/pokemon?query={authors{name}}
// http://localhost:5000/pokemon?query={author(id:1){name}}
app.use('/pokemon', expressGraphQL({
  schema: schema,
  graphiql: true
}))

app.use('/data', dataRouter)
app.use('/anotherdata', anotherDataRouter);

app.listen(PORT || 5000, () => console.log(`Any Port:${PORT} in a S T O R M !!`))

module.exports = app;
