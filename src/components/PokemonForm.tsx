import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';
import {PokemonI} from "../interfaces/PokemonI";

interface PokemonFormProps {
    pokemon: PokemonI;
}

const PokemonForm: React.FC<PokemonFormProps> = ({pokemon}) => {
    const [editedPokemon, setEditedPokemon] = useState<PokemonI>(pokemon);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedPokemon(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/api/pokemon/${pokemon._id}`, editedPokemon);
            console.log(response.data);
        } catch (error) {
            console.error('Error al actualizar el pokemon:', error);
        }
    };

    return (
        <tr>
            <td>{pokemon._id}</td>
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
                <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
            </td>
        </tr>
    );
};

export default PokemonForm;
