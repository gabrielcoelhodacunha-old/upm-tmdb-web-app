import React from "react"
import {NavigationContainer} from "../index"

function SearchContainer() : JSX.Element {
  return (
    <NavigationContainer children={
      <div id="search_container" className="show">
        <input id="search" placeholder="Titulo" />
        <button id="search_button">Pesquisar</button>
      </div>
    } />
  )
}

export default SearchContainer