import addClickEventToButton from "./addClickEventToButton";
import createTableHeader from "./createTableHeader";
import createTableRow from "./createTableRow";
import deleteList from "./deleteList";
import { getMoviesLists, moviesLists } from "./getMoviesLists";
import { listsContainer } from "./htmlElements";
import IMoviesList from "./IMoviesList";
import removeMovieFromList from "./removeMovieFromList";

async function showLists() : Promise<void> {
  const lists = document.getElementById("lists");
  const table = document.createElement('table');
  const columns = ["", "Nome", "Descricao", "Filmes"];
  
  await getMoviesLists();
  if (lists) lists.outerHTML = "";
  table.id = "lists";
  table.appendChild(createTableHeader(columns));
  for (const list of moviesLists) {
    const elements = [
      [createDeleteListButton(list)],
      [document.createTextNode(list.name)],
      [document.createTextNode(list.description)],
      createMoviesInList(list)
    ];
    table.appendChild(createTableRow(elements));
  }
  listsContainer.appendChild(table);
}

function createDeleteListButton({id} : IMoviesList) : HTMLButtonElement {
  const button = document.createElement("button");

  button.textContent = "Deletar Lista";
  addClickEventToButton(button, async () => {
    await deleteList(id);
    await showLists();
  });

  return button;
}

function createMoviesInList({movies, id} : IMoviesList) : Element[] {
  const select = document.createElement("select");
  const button = document.createElement("button");

  for (const movie of movies) {
    const option = document.createElement("option");
    option.value = `movie_${movie.id}`;
    option.textContent = movie.original_title;
    select.appendChild(option);
  }
  button.textContent = "Deletar filme da lista";
  addClickEventToButton(button, async () => {
    if (!select.value) return;
    const movieId = select.value.split("_")[1];
    await removeMovieFromList(movieId, id);
    await showLists();
  });

  return [select, button];
}

export default showLists;