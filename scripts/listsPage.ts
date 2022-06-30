import addClickEventToButton from "./addClickEventToButton";
import createList from "./createList";
import deleteList from "./deleteList";
import { getMoviesLists, moviesLists } from "./getMoviesLists";
import { listDescriptionTextarea, listNameInput, listsContainer } from "./htmlElements";
import IMoviesList from "./IMoviesList";
import removeMovieFromList from "./removeMovieFromList";

async function createMoviesList() : Promise<void> {
  const name = listNameInput.value;
  const description = listDescriptionTextarea.value;
  const newList = await createList(name, description);
  if (!newList) return;
  await showLists();
}

async function showLists() : Promise<void> {
  const lists = document.getElementById("lists");
  const table = document.createElement('table');
  
  await getMoviesLists();
  if (lists) lists.outerHTML = "";
  table.id = "lists";
  table.appendChild(createTableHeader());
  for (const list of moviesLists) {
    table.appendChild(createTableRow(list));
  }
  listsContainer.appendChild(table);
}

function createTableHeader() : HTMLTableRowElement {
  const row = document.createElement("tr");
  const deleteListData = document.createElement("th");
  const name = document.createElement("th");
  const description = document.createElement("th");
  const movies = document.createElement("th");

  row.appendChild(deleteListData);
  name.textContent = "Nome";
  row.appendChild(name);
  description.innerHTML = "Descricao";
  row.appendChild(description);
  movies.innerHTML = "Filmes";
  row.appendChild(movies);

  return row;
}

function createTableRow(list : IMoviesList) : HTMLTableRowElement {
  const row = document.createElement("tr");
  const deleteListData = document.createElement("td");
  const deleteButton = document.createElement("button");
  const name = document.createElement("td");
  const description = document.createElement("td");
  const movies = document.createElement("td");
  const select = document.createElement("select");
  const deleteMovieFromList = document.createElement("button");

  deleteButton.textContent = "Deletar Lista";
  addClickEventToButton(deleteButton, async () => {
    await deleteList(list.id);
    await showLists();
  });
  deleteListData.appendChild(deleteButton);
  row.appendChild(deleteListData);
  name.textContent = list.name;
  row.appendChild(name);
  description.textContent = list.description;
  row.appendChild(description);
  for (const movie of list.movies) {
    const option = document.createElement("option");
    console.log(movie);
    option.value = `movie_${movie.id}`;
    option.innerHTML = movie.original_title;
    select.appendChild(option);
  }
  movies.appendChild(select);
  deleteMovieFromList.textContent = "Deletar filme da lista";
  addClickEventToButton(deleteMovieFromList, async () => {
    if (!select.value) return;
    const movieId = select.value.split("_")[1];
    await removeMovieFromList(movieId, String(list.id));
    await showLists();
  });
  movies.appendChild(deleteMovieFromList);
  row.appendChild(movies);

  return row;
}

export { createMoviesList, showLists };