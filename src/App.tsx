import React from 'react'
import './App.css'
import CustomContainer from "./components/CustomContainer";
import PokemonList from "./components/PokemonList";

const App: React.FC = () => {
  return (<>
      <CustomContainer>
          <PokemonList />
      </CustomContainer>
  </>)
}

export default App
