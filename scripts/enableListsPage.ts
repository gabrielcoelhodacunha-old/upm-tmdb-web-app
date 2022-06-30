import { activateListsButton, listsContainer } from "./htmlElements";
import { showLists } from "./listsPage";
import enablePage from "./enablePage";

async function enableListsPage() : Promise<void> {
  enablePage(listsContainer, activateListsButton);
  await showLists();
}

export default enableListsPage;