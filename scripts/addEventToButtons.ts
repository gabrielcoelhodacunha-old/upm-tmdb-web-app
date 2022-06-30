import { activateListsButton, activateSearchButton, createListButton,
  loginButton, searchButton } from "./htmlElements";
import { createMoviesList } from "./listsPage";
import viewSearchResults from "./seachPage";
import addClickEventToButton from "./addClickEventToButton";
import authenticateAndEnablePages from "./authenticateAndEnablePages";
import enableListsPage from "./enableListsPage";
import enableSearchPage from "./enableSearchPage";

function addEventToButtons() : void {
  addClickEventToButton(loginButton, authenticateAndEnablePages);
  addClickEventToButton(searchButton, viewSearchResults);
  addClickEventToButton(activateSearchButton, enableSearchPage);
  addClickEventToButton(activateListsButton, enableListsPage);
  addClickEventToButton(createListButton, createMoviesList);
}

export default addEventToButtons;