import React, {useEffect, useState} from 'react'
import {Button, Form, Table} from 'react-bootstrap'
import PokemonForm from './PokemonForm'
import {PokemonI} from '../interfaces/PokemonI'
import {createPokemon, getPokemons} from "../services/pokemonService";

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokemonI[]>([])
    const [newPokemon, setNewPokemon] = useState<PokemonI>({
        nombre: '',
        poder: '',
        vida: 0
    })

    useEffect(() => {
        updatePokemons().then(r => console.log(r))
    }, [])

    const updatePokemons = async () => {
        try {
            const data = await getPokemons()
            setPokemons(data)
        } catch (error) {
            console.error('Error al obtener los pokemons:', error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPokemons()
                setPokemons(data)
            } catch (error) {
                console.error('Error al obtener los pokemons:', error)
            }
        }
        fetchData().then(r => console.log(r))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setNewPokemon(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleAddPokemon = async () => {
        try {
            const data = await createPokemon(newPokemon)
            console.log(data)
            // Actualizamos la lista de pokemons
            setPokemons(prevPokemons => [...prevPokemons, data])
            // Limpiamos los campos del nuevo pokemon
            setNewPokemon({
                nombre: '',
                poder: '',
                vida: 0
            })
        } catch (error) {
            console.error('Error al agregar un nuevo pokemon:', error)
        }
    }

    return (<>
        <h1>Pokemons</h1>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Poder</th>
                <th>Vida</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr>
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
                <PokemonForm key={pokemon._id} pokemon={pokemon} updatePokemons={updatePokemons}/>
            ))}

            </tbody>
        </Table>
    </>)
}


export default PokemonList
