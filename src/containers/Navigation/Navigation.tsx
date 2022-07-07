import React, { PropsWithChildren, useState } from "react"
import { useNavigate } from "react-router"


function NavigationContainer(
{ children } : PropsWithChildren
) : JSX.Element {
  const [disabled, setDisabled] = useState(true)
  const navigate = useNavigate();
  const goToRoute = (route : string) => {
    navigate(route)
    setDisabled(!disabled)
  }

  return (
    <div id="pesquisar_ou_listas">
      <button id="activate_search_button"
        disabled={disabled}
        onClick={() => goToRoute("/search")}>Pesquisar</button>
      <button id="activate_lists_button"
        disabled={!disabled}
        onClick={() => goToRoute("/lists")}>Listas</button>
      {children}
    </div>
  )
}

export default NavigationContainer