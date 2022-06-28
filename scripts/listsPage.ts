import { criarLista, listasDeFilmes } from "./handleMovies";
import { listDescriptionTextarea, listNameInput } from "./htmlElements";
import viewSearchResults from "./seachPage";

async function createMoviesList() {
  const name = listNameInput.value;
  const description = listDescriptionTextarea.value;
  const newList = await criarLista(name, description);
  if (!newList) return;
  listasDeFilmes.unshift(newList);
  viewSearchResults();
}

export {createMoviesList};