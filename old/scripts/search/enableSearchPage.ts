import { activateSearchButton, searchContainer } from "constants/htmlElements";
import viewSearchResults from "search/viewSearchResults";
import elementWithIdExists from "utils/elementWithIdExists";
import enablePage from "utils/enablePage";

async function enableSearchPage() : Promise<void> {
  enablePage(searchContainer, activateSearchButton);
  if (!elementWithIdExists("lista")) return;
  await viewSearchResults();
}

export default enableSearchPage;