import { authenticate } from "./authenticate";
import { CSS_HIDE_CLASS } from "./constants";
import { procurarFilme } from "./handleMovies";
import { activateListsButton, activateSearchButton, listsContainer, loginButton, searchButton, searchContainer, searchInput } from "./htmlElements";

function addEventToButtons() {
  addClickEventToButton(loginButton, authenticateAndDisableInputs);
  addClickEventToButton(searchButton, viewSearchResults);
  addClickEventToButton(activateSearchButton, enableSearchPage);
  addClickEventToButton(activateListsButton, enableListsPage);
}

function addClickEventToButton(button : HTMLButtonElement, callback : any) {
  button.addEventListener("click", callback);
}

async function authenticateAndDisableInputs() {
  if (!(await authenticate())) return;
  const INPUTS = document.querySelectorAll("#login_container > input");
  INPUTS.forEach(value => (value as HTMLInputElement).disabled = true);
  loginButton.disabled = true;
}

async function viewSearchResults() {
  let lista = document.getElementById("lista");
  if (lista) lista.outerHTML = "";
  let query = searchInput.value;
  let listaDeFilmes = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "lista"
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title))
    ul.appendChild(li)
  }
  searchContainer.appendChild(ul);
}

function enableSearchPage() {
  enablePage(searchContainer, activateSearchButton);
}

function enableListsPage() {
  enablePage(listsContainer, activateListsButton);
}

function enablePage(container : HTMLDivElement, button : HTMLButtonElement) {
  const CONTAINERS = document.querySelectorAll("#pesquisar_ou_listas div");
  const BUTTONS = document.querySelectorAll("#pesquisar_ou_listas > button");
  CONTAINERS.forEach(value => value.classList.add(CSS_HIDE_CLASS));
  BUTTONS.forEach(value => (value as HTMLButtonElement).disabled = false);
  container.classList.remove(CSS_HIDE_CLASS);
  button.disabled = true;
}

export default addEventToButtons;