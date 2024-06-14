import React, {useEffect, useState} from 'react';
import {Button, Form, Table} from 'react-bootstrap';
import axios from 'axios';
import PokemonForm from './PokemonForm';
import {PokemonI} from "../interfaces/PokemonI";

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokemonI[]>([]);
    const [newPokemon, setNewPokemon] = useState<PokemonI>({
        nombre: '',
        poder: '',
        vida: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/pokemon');
                setPokemons(response.data);
            } catch (error) {
                console.error('Error al obtener los pokemons:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewPokemon(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddPokemon = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/pokemon', newPokemon);
            console.log(response.data);
            // Actualizamos la lista de pokemons
            setPokemons(prevPokemons => [...prevPokemons, response.data]);
            // Limpiamos los campos del nuevo pokemon
            setNewPokemon({
                nombre: '',
                poder: '',
                vida: 0
            });
        } catch (error) {
            console.error('Error al agregar un nuevo pokemon:', error);
        }
    };

    return (
        <>
            <h1>Pokemons</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Poder</th>
                    <th>Vida</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td>
                        <Form.Control type="text" name="nombre" value={newPokemon.nombre} onChange={handleChange}/>
                    </td>
                    <td>
                        <Form.Control type="text" name="poder" value={newPokemon.poder} onChange={handleChange}/>
                    </td>
                    <td>
                        <Form.Control type="number" name="vida" value={newPokemon.vida} onChange={handleChange}/>
                    </td>
                    <td>
                        <Button variant="success" onClick={handleAddPokemon}>Agregar</Button>
                    </td>
                </tr>
                {pokemons.map(pokemon => (
                    <PokemonForm key={pokemon._id} pokemon={pokemon}/>
                ))}

                </tbody>
            </Table>
        </>
    );
};


export default PokemonList;
