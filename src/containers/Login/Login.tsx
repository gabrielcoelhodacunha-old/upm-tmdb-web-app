import React from "react"

function LoginContainer() : JSX.Element {
  return (
    <div id="login_container">
      <input id="login" placeholder="Login" type="password" />
      <input id="senha" placeholder="Senha" type="password" />
      <input id="api_key" placeholder="Api Key" type="password" />
      <button id="login_button">Login</button>
    </div>
  )
}

export default LoginContainer