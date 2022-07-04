import { apiKeyInput, loginInput, searchInput, senhaInput } from "constants/htmlElements";
import addEnterEventToInput from "utils/addEnterEventToInput";
import viewSearchResults from "search/viewSearchResults";
import authenticateAndEnableInitialPage from "login/authenticateAndEnableInitialPage";

function addEventToInputs() : void {
  addEnterEventToInput(loginInput, authenticateAndEnableInitialPage);
  addEnterEventToInput(senhaInput, authenticateAndEnableInitialPage);
  addEnterEventToInput(apiKeyInput, authenticateAndEnableInitialPage);
  addEnterEventToInput(searchInput, viewSearchResults);
}

export default addEventToInputs;