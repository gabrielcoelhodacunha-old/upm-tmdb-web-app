import addClickEventToButton from "utils/addClickEventToButton";
import createTableHeader from "utils/createTableHeader";
import createTableRow from "utils/createTableRow";
import deleteList from "tmdb/deleteList";
import { getMoviesLists, moviesLists } from "tmdb/getMoviesLists";
import { listsContainer } from "constants/htmlElements";
import IMoviesList from "utils/IMoviesList";
import removeMovieFromList from "tmdb/removeMovieFromList";

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
    option.textContent = movie.title;
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