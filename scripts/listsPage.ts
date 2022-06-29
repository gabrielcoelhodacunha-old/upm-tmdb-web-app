import { addClickEventToButton } from "./addEventToButtons";
import { criarLista, deleteList, getMoviesLists, IMoviesList, listasDeFilmes } from "./handleMovies";
import { listDescriptionTextarea, listNameInput, listsContainer } from "./htmlElements";

async function createMoviesList() {
  const name = listNameInput.value;
  const description = listDescriptionTextarea.value;
  const newList = await criarLista(name, description);
  if (!newList) return;
  await showLists();
}

async function showLists() {
  const lists = document.getElementById("lists");
  const table = document.createElement('table');
  
  await getMoviesLists();
  if (lists) lists.outerHTML = "";
  table.id = "lists";
  table.appendChild(createTableHeader());
  for (const list of listasDeFilmes) {
    table.appendChild(createTableRow(list));
  }
  listsContainer.appendChild(table);
}

function createTableHeader() : HTMLTableRowElement {
  const row = document.createElement("tr");
  const name = document.createElement("th");
  const description = document.createElement("th");

  name.innerHTML = "Nome";
  row.appendChild(name);
  description.innerHTML = "Descricao";
  row.appendChild(description);

  return row;
}

function createTableRow(list : IMoviesList) : HTMLTableRowElement {
  const row = document.createElement("tr");
  const name = document.createElement("th");
  const description = document.createElement("th");
  const deleteButton = document.createElement("button");

  name.innerHTML = list.name;
  row.appendChild(name);
  description.innerHTML = list.description;
  row.appendChild(description);
  deleteButton.innerHTML = "Deletar";
  addClickEventToButton(deleteButton, async () => {
    await deleteList(list.id);
    await showLists();
  });
  row.appendChild(deleteButton);

  return row;
}

export { createMoviesList, showLists };