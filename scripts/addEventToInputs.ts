import { apiKeyInput, loginInput, searchInput, senhaInput } from "./htmlElements";
import addEnterEventToInput from "./addEnterEventToInput";
import viewSearchResults from "./seachPage";
import authenticateAndEnablePages from "./authenticateAndEnablePages";

function addEventToInputs() : void {
  addEnterEventToInput(loginInput, authenticateAndEnablePages);
  addEnterEventToInput(senhaInput, authenticateAndEnablePages);
  addEnterEventToInput(apiKeyInput, authenticateAndEnablePages);
  addEnterEventToInput(searchInput, viewSearchResults);
}

export default addEventToInputs;