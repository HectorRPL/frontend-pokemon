import {PokemonI} from "./PokemonI";

export interface PokemonFormProps {
    pokemon: PokemonI
    updatePokemons: () => Promise<void>
}