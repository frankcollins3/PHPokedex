import React from 'react';
import logo from './logo.svg';
import styles from './styles/Home.module.scss'
import { graphql, buildSchema } from "graphql";
import './App.css';
import axios from 'axios'
// var { graphql, buildSchema } = require("graphql")
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const allpokemon = buildSchema(`
    type Query {
      allPokemon: String
    }
`)

const rootValue = {
    allpokemon: () => {
      return axios.get(`https://pokeapi.co/api/v2/pokemon/ditto`)
    }
}

function App() {
  return (

    <div className="App">
      {/* <header  className="App-header"> */}
      <header id={styles.Bubble} className="App-header">
        <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
        }}>
        <img src="img/pikachu.png" className="App-logo" alt="logo" />
        {/* <img src="https://homestarrunner.com/assets/home/landing_leanins_cht.png" className="App-logo" alt="logo" /> */}
        </div>
        
      </header>
    </div>
    
  );
}

export default App;
