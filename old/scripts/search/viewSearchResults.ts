port addClickEventToButton from "utils/addClickEventToButton";
import addMovieToList from "tmdb/addMovieToList";
import createTableHeader from "utils/createTableHeader";
import createTableRow from "utils/createTableRow";
import { moviesLists } from "tmdb/getMoviesLists";
import { searchContainer, searchInput } from "constants/htmlElements";
import removeMovieFromList from "tmdb/removeMovieFromList";
import searchMovie from "tmdb/searchMovie";
import { BASE_IMAGES_URL } from "constants/urls";

async function viewSearchResults() : Promise<void> {
  const lista = document.getElementById("lista");
  if (lista) lista.outerHTML = "";

  const query = searchInput.value;
  if (!query) return;

  const table = document.createElement('table');
  const columns = ["", "Titulo", "Listas"];
  const movies = await searchMovie(query);
  
  table.id = "lista";
  table.appendChild(createTableHeader(columns));
  for (const movie of movies.results) {
    const elements = [
      [createImage(movie)],
      [document.createTextNode(movie.title)],
      createLists(movie)
    ];
    table.appendChild(createTableRow(elements));
  }
  searchContainer.appendChild(table);
}

function createImage({poster_path, title} : any) : HTMLImageElement {
  const image = document.createElement("img");

  if (!poster_path) {
    image.src = "";
    image.alt = "Poster image not found!";
  }
  else {
    image.src = `${BASE_IMAGES_URL}${poster_path}`;
    image.alt = `Poster image for ${title}`;
  }

  return image;
}

function createLists(movie : any) : Element[] {
  const select = document.createElement("select");
  const addToList = document.createElement("button");
  const removeFromList = document.createElement("button");
  const lists = [select, addToList, removeFromList];
  const _toggleAddAndRemoveButtons = () => toggleAddAndRemoveButtons(
    lists, movie
  );

  for (const {id, name} of moviesLists) {
    const option = document.createElement("option");
    option.value = `list_${id}`;
    option.textContent = name;
    select.appendChild(option);
  }
  select.onchange = _toggleAddAndRemoveButtons;

  addTextAndClickEventToButton(addToList, "Adicionar", async () => {
    const listId = select.value.split("_")[1];
    await addMovieToList(movie.id, listId);
    _toggleAddAndRemoveButtons();
  });

  addTextAndClickEventToButton(removeFromList, "Remover", async () => {
    const listId = select.value.split("_")[1];
    await removeMovieFromList(movie.id, Number(listId));
    _toggleAddAndRemoveButtons();
  });

  moviesLists.length ? _toggleAddAndRemoveButtons() : disableElements(lists);

  return lists;
}

function toggleAddAndRemoveButtons(
  [select, addToList, removeFromList] : any[],
  movie : any
) : void {
  const listId = select.value.split("_")[1];

  if (!moviesLists.length) return;
  if (isMovieInList(movie, listId)) {
    addToList.disabled = true;
    removeFromList.disabled = false;
  }
  else {
    addToList.disabled = false;
    removeFromList.disabled = true;
  }
}

function isMovieInList({id} : any, listId : string) : boolean {
  const listIndex = moviesLists.findIndex(list => list.id === Number(listId));

  if (!moviesLists[listIndex] || !moviesLists[listIndex].movies) return false;
  return moviesLists[listIndex].movies.some(movie => movie.id === id);
}

function addTextAndClickEventToButton(
  button : HTMLButtonElement, text : string, callback : any
) : void {
  button.textContent = text;
  addClickEventToButton(button, callback);
}

function disableElements(elements : any[]) : void {
  elements.forEach(element => element.disabled = true);
}

export default viewSearchResults;