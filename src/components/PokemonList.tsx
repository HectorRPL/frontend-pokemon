import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import PokemonForm from './PokemonForm';
import {PokemonI} from "../interfaces/PokemonI";

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokemonI[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/pokemon');
                setPokemons(response.data);
            } catch (error) {
                console.error('Error al obtener los Pokémon:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Poder</th>
                <th>Vida</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {pokemons.map(pokemon => (
                <PokemonForm key={pokemon._id} pokemon={pokemon} />
            ))}
            </tbody>
        </Table>
    );
};

export default PokemonList;
