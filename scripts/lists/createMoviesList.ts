import createList from "tmdb/createList";
import { listDescriptionTextarea, listNameInput } from "constants/htmlElements";
import showLists from "lists/showLists";

async function createMoviesList() : Promise<void> {
  const name = listNameInput.value;
  const description = listDescriptionTextarea.value;
  const newList = await createList(name, description);
  if (!newList) return;
  await showLists();
}

export default createMoviesList;