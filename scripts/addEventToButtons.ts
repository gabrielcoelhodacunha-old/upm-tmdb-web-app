import { authenticate, sessionId } from "./authenticate";
import { CSS_HIDE_CLASS, CSS_SHOW_CLASS } from "./constants";
import { activateListsButton, activateSearchButton, createListButton, listsContainer, loginButton, searchButton, searchContainer } from "./htmlElements";
import { createMoviesList, showLists } from "./listsPage";
import viewSearchResults from "./seachPage";

function enableLogin() {
  toggleElements(true, "input");
  toggleElements(true, "button");
  toggleElements(false, "input", "#login_container");
  toggleElements(false, "button", "#login_container");
}

function toggleElements(disabled : boolean, type : string = "", parentId : string = "") {
  const elements = document.querySelectorAll(`${parentId} ${type}`);
  elements.forEach(element => (element as HTMLInputElement).disabled = disabled);
}

function addEventToButtons() {
  addClickEventToButton(loginButton, authenticateAndEnablePages);
  addClickEventToButton(searchButton, viewSearchResults);
  addClickEventToButton(activateSearchButton, enableSearchPage);
  addClickEventToButton(activateListsButton, enableListsPage);
  addClickEventToButton(createListButton, createMoviesList);
}

function addClickEventToButton(button : HTMLButtonElement, callback : any) {
  button.addEventListener("click", callback);
}

async function authenticateAndEnablePages() {
  if (!(await authenticate())) return;
  enablePages();
}

function disableLogin() : number {
  if (!sessionId) return 0;
  toggleElements(false, "input");
  toggleElements(false, "button");
  toggleElements(true, "input", "#login_container");
  toggleElements(true, "button", "#login_container");
  return 1;
}

function enablePages() {
  if (!disableLogin()) return;
  enableListsPage();
  enableSearchPage();
}

async function enableSearchPage() {
  enablePage(searchContainer, activateSearchButton);
  if (document.getElementById("lista")) await viewSearchResults();
}

async function enableListsPage() {
  enablePage(listsContainer, activateListsButton);
  await showLists();
}

function enablePage(container : HTMLDivElement, button : HTMLButtonElement) {
  const CONTAINERS = document.querySelectorAll("#pesquisar_ou_listas div");
  const BUTTONS = document.querySelectorAll("#pesquisar_ou_listas > button");
  CONTAINERS.forEach(value => value.classList.add(CSS_HIDE_CLASS));
  CONTAINERS.forEach(value => value.classList.remove(CSS_SHOW_CLASS));
  BUTTONS.forEach(value => (value as HTMLButtonElement).disabled = false);
  container.classList.remove(CSS_HIDE_CLASS);
  container.classList.add(CSS_SHOW_CLASS);
  button.disabled = true;
}

export { authenticateAndEnablePages, viewSearchResults, enableLogin, addClickEventToButton };

export default addEventToButtons;