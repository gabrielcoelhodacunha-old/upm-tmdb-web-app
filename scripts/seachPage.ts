import addClickEventToButton from "./addClickEventToButton";
import addMovieToList from "./addMovieToList";
import { moviesLists } from "./getMoviesLists";
import { searchContainer, searchInput } from "./htmlElements";
import removeMovieFromList from "./removeMovieFromList";
import searchMovie from "./searchMovie";
import { BASE_IMAGES_URL } from "./urls";

async function viewSearchResults() : Promise<void> {
  let lista = document.getElementById("lista");
  let query = searchInput.value;
  let movies : any;
  let table = document.createElement('table');
  
  if (lista) lista.outerHTML = "";
  if (!query) return;
  movies = await searchMovie(query);
  table.id = "lista";
  table.appendChild(createTableHeader());
  for (const item of movies.results) {
    table.appendChild(await createTableRow(item));
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

async function createTableRow(item : any) : Promise<HTMLTableRowElement> {
  const row = document.createElement("tr");
  const image = document.createElement("img");
  const title = document.createElement("td");
  const lists = document.createElement("td");
  const select = document.createElement("select");
  const addToList = document.createElement("button");
  const removeFromList = document.createElement("button");

  if (!item.poster_path) {
    image.src = "";
    image.alt = "Image not found!";
  }
  else image.src = `${BASE_IMAGES_URL}${item.poster_path}`;
  row.appendChild(image);
  title.textContent = item.original_title;
  row.appendChild(title);
  for (const lista of moviesLists) {
    const option = document.createElement("option");
    option.value = `list_${lista.id}`;
    option.innerHTML = lista.name;
    select.appendChild(option);
  }
  const toggleAddAndRemoveButtons = async () => {
    const listId = select.value.split("_")[1];
    if (!moviesLists.length) return;
    const listIndex = moviesLists.findIndex(list => String(list.id) == listId);
    const isMovieInList = moviesLists[listIndex].movies?.some(movie => movie.id === item.id);
    if (isMovieInList) {
      addToList.disabled = true;
      removeFromList.disabled = false;
    }
    else {
      addToList.disabled = false;
      removeFromList.disabled = true;
    }
  };
  select.onchange = toggleAddAndRemoveButtons;
  lists.appendChild(select);
  addToList.innerHTML = "Adicionar";
  addClickEventToButton(addToList, async () => {
    const listId = select.value.split("_")[1];
    await addMovieToList(item.id, listId);
    await toggleAddAndRemoveButtons();
  });
  lists.appendChild(addToList);
  removeFromList.innerHTML = "Remover";
  addClickEventToButton(removeFromList, async () => {
    const listId = select.value.split("_")[1];
    await removeMovieFromList(item.id, listId);
    await toggleAddAndRemoveButtons();
  });
  lists.appendChild(removeFromList);
  row.appendChild(lists);
  if (!moviesLists.length) {
    select.disabled = true;
    addToList.disabled = true;
    removeFromList.disabled = true;
  }
  else await toggleAddAndRemoveButtons();
  
  return row;
}

export default viewSearchResults;