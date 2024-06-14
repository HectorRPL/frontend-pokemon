import axios from 'axios'
import axiosRetry from 'axios-retry'
import { PokemonI } from '../interfaces/PokemonI'

axiosRetry(axios, { retries: 5, retryDelay: (retryCount) => retryCount * 10000 })

const API_URL = 'http://localhost:4000/api/pokemon'

export const getPokemons = async (): Promise<PokemonI[]> => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.error('Error al obtener los pokemons:', error)
        throw error
    }
}

export const createPokemon = async (pokemon: PokemonI): Promise<PokemonI> => {
    try {
        const response = await axios.post(API_URL, pokemon)
        return response.data
    } catch (error) {
        console.error('Error al crear el pokemon:', error)
        throw error
    }
}

export const updatePokemon = async (id: string = '', pokemon: PokemonI): Promise<PokemonI> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, pokemon)
        return response.data
    } catch (error) {
        console.error('Error al actualizar el pokemon:', error)
        throw error
    }
}

export const deletePokemon = async (id: string = ''): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`)
    } catch (error) {
        console.error('Error al borrar el pokemon:', error)
        throw error
    }
}
