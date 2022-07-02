import { apiKeyInput, loginInput, searchInput, senhaInput } from "./htmlElements";
import addEnterEventToInput from "./addEnterEventToInput";
import viewSearchResults from "./viewSearchResults";
import authenticateAndEnableInitialPage from "./authenticateAndEnableInitialPage";

function addEventToInputs() : void {
  addEnterEventToInput(loginInput, authenticateAndEnableInitialPage);
  addEnterEventToInput(senhaInput, authenticateAndEnableInitialPage);
  addEnterEventToInput(apiKeyInput, authenticateAndEnableInitialPage);
  addEnterEventToInput(searchInput, viewSearchResults);
}

export default addEventToInputs;