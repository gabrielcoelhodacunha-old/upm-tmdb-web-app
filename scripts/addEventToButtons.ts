import { authenticate } from "./authenticate";
import { CSS_HIDE_CLASS, IMAGES_BASE_URL } from "./constants";
import { procurarFilme } from "./handleMovies";
import { activateListsButton, activateSearchButton, listsContainer, loginButton, searchButton, searchContainer, searchInput } from "./htmlElements";

let listasDeFilmes : string[];

listasDeFilmes = ["Uno", "Two", "3"];

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
  let query = searchInput.value;
  let movies = await procurarFilme(query);
  let table = document.createElement('table');
  
  if (lista) lista.outerHTML = "";
  table.id = "lista";
  table.appendChild(createTableHeader());
  for (const item of movies.results) {
    table.appendChild(createTableRow(item));
  }
  searchContainer.appendChild(table);
}

function createTableHeader() : HTMLTableRowElement {
  const row = document.createElement("tr");
  const image = document.createElement("th");
  const title = document.createElement("th");
  const lists = document.createElement("th");

  row.appendChild(image);
  title.innerHTML = "Titulo";
  row.appendChild(title);
  lists.innerHTML = "Listas";
  row.appendChild(lists);

  return row;
}

function createTableRow(item : any) : HTMLTableRowElement {
  const row = document.createElement("tr");
  const image = document.createElement("img");
  const addToList = document.createElement("button");
  const removeFromList = document.createElement("button");
  const title = document.createElement("td");
  const lists = document.createElement("td");
  const select = document.createElement("select");

  image.src = `${IMAGES_BASE_URL}${item.poster_path}`;
  row.appendChild(image);
  title.textContent = item.original_title;
  row.appendChild(title);
  for (const lista of listasDeFilmes) {
    const option = document.createElement("option");
    option.value = lista;
    option.innerHTML = lista;
    select.appendChild(option);
  }
  lists.appendChild(select);
  addToList.innerHTML = "Adicionar";
  lists.appendChild(addToList);
  removeFromList.innerHTML = "Remover";
  lists.appendChild(removeFromList);
  row.appendChild(lists);

  return row;
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

export { authenticateAndDisableInputs, viewSearchResults };

export default addEventToButtons;