import createList from "./createList";
import { listDescriptionTextarea, listNameInput } from "./htmlElements";
import showLists from "./showLists";

async function createMoviesList() : Promise<void> {
  const name = listNameInput.value;
  const description = listDescriptionTextarea.value;
  const newList = await createList(name, description);
  if (!newList) return;
  await showLists();
}

export default createMoviesList;