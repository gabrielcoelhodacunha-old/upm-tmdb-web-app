import { addClickEventToButton } from "./addEventToButtons";
import { IMAGES_BASE_URL } from "./constants";
import { adicionarFilmeNaLista, listasDeFilmes, procurarFilme, removeMovieFromList } from "./handleMovies";
import { searchContainer, searchInput } from "./htmlElements";

async function viewSearchResults() {
  let lista = document.getElementById("lista");
  let query = searchInput.value;
  let movies : any;
  let table = document.createElement('table');
  
  if (lista) lista.outerHTML = "";
  if (!query) return;
  movies = await procurarFilme(query);
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
    option.value = `list_${lista.id}`;
    option.innerHTML = lista.name;
    select.appendChild(option);
  }
  const toggleAddAndRemoveButtons = async () => {
    const listId = select.value.split("_")[1];
    if (!listasDeFilmes.length) return;
    const listIndex = listasDeFilmes.findIndex(list => String(list.id) == listId);
    const isMovieInList = listasDeFilmes[listIndex].movies?.some(movie => movie.id === item.id);
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
    await adicionarFilmeNaLista(item.id, listId);
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
  await toggleAddAndRemoveButtons();
  
  return row;
}

export default viewSearchResults;