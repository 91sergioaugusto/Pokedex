import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { Container, Skeleton } from '@mui/material';
import { Grid } from '@mui/material';
import axios from 'axios';

export const Home = () =>{
    const [pokemons, setPokemons] = useState([]);
    useEffect(() =>{
        getPokemons();
    },[]);

const getPokemons = () =>{
    var endpoints = []
    for (var i=1; i<151; i++){
        endpoints.push(`http://pokeapi.co/api/v2/pokemon/${i}/`)
    }
    axios.all(endpoints.map((endpoint)=> axios.get(endpoint))).then((res) => setPokemons(res));

 };


 const pokemonFilter = (name) => {
    var filteredPokemons = [];
    if (name===''){
        getPokemons()
    }
    for ( var i in pokemons) {
        if (pokemons[i].data.name.includes(name)){
            filteredPokemons.push(pokemons[i]);
        }
    }
    setPokemons(filteredPokemons);
 };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth= "false" >
        <Grid container spacing={3}>
            {pokemons.map((pokemon, key) =>(
                <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types} />
                </Grid>
            ))}      
        </Grid> 
      </Container>
    </div>
  );
};

export default Home;