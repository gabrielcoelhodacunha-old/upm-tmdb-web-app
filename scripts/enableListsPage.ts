import { activateListsButton, listsContainer } from "./htmlElements";
import enablePage from "./enablePage";
import showLists from "./showLists";

async function enableListsPage() : Promise<void> {
  enablePage(listsContainer, activateListsButton);
  await showLists();
}

export default enableListsPage;