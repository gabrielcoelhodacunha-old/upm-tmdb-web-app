import { apiKeyInput, loginButton, loginInput, senhaInput } from "./htmlElements";

function addEventToInputs() : void {
  addChangeEventToInput(loginInput);
  addChangeEventToInput(senhaInput);
  addChangeEventToInput(apiKeyInput);
}

function addChangeEventToInput(input : HTMLInputElement) : void {
  input.addEventListener('change', validateLoginButton);
}

function validateLoginButton() : void {
  let login = loginInput.value;
  let senha = senhaInput.value;
  let apiKey = apiKeyInput.value;
  loginButton.disabled = login && senha && apiKey ? false : true;
}

export default addEventToInputs;