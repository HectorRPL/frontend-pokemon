import React, {useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'
import axios from 'axios'
import {PokemonI} from '../interfaces/PokemonI'

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokemonI[]>([])

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/pokemon')
                setPokemons(response.data)
            } catch (error) {
                console.error('Error al tratar de obtener pokemons: ', error)
            }
        }

        fetchPokemons().then(r => console.log(r))
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Poder</th>
                <th>Vida</th>
            </tr>
            </thead>
            <tbody>
            {pokemons.map((pokemon, index) => (
                <tr key={index}>
                    <td>{pokemon.nombre}</td>
                    <td>{pokemon.poder}</td>
                    <td>{pokemon.vida}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}

export default PokemonList