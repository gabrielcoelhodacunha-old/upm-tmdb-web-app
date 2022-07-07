import { activateListsButton, activateSearchButton, createListButton,
  loginButton, searchButton } from "constants/htmlElements";
import createMoviesList from "lists/createMoviesList";
import viewSearchResults from "search/viewSearchResults";
import addClickEventToButton from "utils/addClickEventToButton";
import authenticateAndEnableInitialPage from "login/authenticateAndEnableInitialPage";
import enableListsPage from "lists/enableListsPage";
import enableSearchPage from "search/enableSearchPage";

function addEventToButtons() : void {
  addClickEventToButton(loginButton, authenticateAndEnableInitialPage);
  addClickEventToButton(searchButton, viewSearchResults);
  addClickEventToButton(activateSearchButton, enableSearchPage);
  addClickEventToButton(activateListsButton, enableListsPage);
  addClickEventToButton(createListButton, createMoviesList);
}

export default addEventToButtons;