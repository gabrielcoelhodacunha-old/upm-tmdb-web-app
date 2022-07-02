import { activateSearchButton, searchContainer } from "./htmlElements";
import viewSearchResults from "./viewSearchResults";
import elementWithIdExists from "./elementWithIdExists";
import enablePage from "./enablePage";

async function enableSearchPage() : Promise<void> {
  enablePage(searchContainer, activateSearchButton);
  if (!elementWithIdExists("lista")) return;
  await viewSearchResults();
}

export default enableSearchPage;