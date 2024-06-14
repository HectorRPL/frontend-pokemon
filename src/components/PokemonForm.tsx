import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {PokemonI} from '../interfaces/PokemonI'
import {PokemonFormProps} from '../interfaces/PokemonFormPropsI'
import {FaSave, FaTrashAlt} from 'react-icons/fa'
import {deletePokemon, updatePokemon} from "../services/pokemonService";


const PokemonForm: React.FC<PokemonFormProps> = ({pokemon, updatePokemons}) => {
    const [editedPokemon, setEditedPokemon] = useState<PokemonI>(pokemon)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setEditedPokemon(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleUpdatePokemon = async () => {
        try {
            const data = await updatePokemon(pokemon._id, editedPokemon)
            console.log(data)
        } catch (error) {
            console.error('Error al actualizar el pokemon:', error)
        }
    }

    const handleDeletePokemon = async () => {
        try {
            await deletePokemon(pokemon._id)
            await updatePokemons()
        } catch (error) {
            console.error('Error al borrar el pokemon:', error)
        }
    }

    return (
        <tr>
            <td>
                <Form>
                    <Form.Control type="text" name="nombre" value={editedPokemon.nombre} onChange={handleChange}/>
                </Form>
            </td>
            <td>
                <Form>
                    <Form.Control type="text" name="poder" value={editedPokemon.poder} onChange={handleChange}/>
                </Form>
            </td>
            <td>
                <Form>
                    <Form.Control type="number" name="vida" value={editedPokemon.vida} onChange={handleChange}/>
                </Form>
            </td>
            <td>
                <Button variant="primary" onClick={handleUpdatePokemon} className="me-2">
                    <FaSave />
                </Button>
                <Button variant="danger" onClick={handleDeletePokemon}>
                    <FaTrashAlt />
                </Button>
            </td>
        </tr>
    )
}

export default PokemonForm
