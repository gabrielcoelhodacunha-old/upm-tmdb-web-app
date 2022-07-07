import { activateListsButton, listsContainer } from "constants/htmlElements";
import enablePage from "utils/enablePage";
import showLists from "lists/showLists";

async function enableListsPage() : Promise<void> {
  enablePage(listsContainer, activateListsButton);
  await showLists();
}

export default enableListsPage;