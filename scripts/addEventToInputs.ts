import { authenticateAndEnablePages, viewSearchResults } from "./addEventToButtons";
import { apiKeyInput, loginInput, searchInput, senhaInput } from "./htmlElements";

function addEventToInputs() : void {
  addEnterEventToInput(loginInput, authenticateAndEnablePages);
  addEnterEventToInput(senhaInput, authenticateAndEnablePages);
  addEnterEventToInput(apiKeyInput, authenticateAndEnablePages);
  addEnterEventToInput(searchInput, viewSearchResults);
}

function addEnterEventToInput(input : HTMLInputElement, callback : any) : void {
  input.addEventListener("keypress", event => event.key === "Enter" ? callback() : null);
}

export default addEventToInputs;