import { IMAGES_BASE_URL } from "./constants";
import { listasDeFilmes, procurarFilme } from "./handleMovies";
import { searchContainer, searchInput } from "./htmlElements";

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
    option.value = lista.name;
    option.innerHTML = lista.name;
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

export default viewSearchResults;