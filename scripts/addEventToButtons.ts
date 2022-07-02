import { activateListsButton, activateSearchButton, createListButton,
  loginButton, searchButton } from "./htmlElements";
import createMoviesList from "./createMoviesList";
import viewSearchResults from "./viewSearchResults";
import addClickEventToButton from "./addClickEventToButton";
import authenticateAndEnableInitialPage from "./authenticateAndEnableInitialPage";
import enableListsPage from "./enableListsPage";
import enableSearchPage from "./enableSearchPage";

function addEventToButtons() : void {
  addClickEventToButton(loginButton, authenticateAndEnableInitialPage);
  addClickEventToButton(searchButton, viewSearchResults);
  addClickEventToButton(activateSearchButton, enableSearchPage);
  addClickEventToButton(activateListsButton, enableListsPage);
  addClickEventToButton(createListButton, createMoviesList);
}

export default addEventToButtons;