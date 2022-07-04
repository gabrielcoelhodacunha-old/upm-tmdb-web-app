import { authenticate, isLoggedIn } from "tmdb/authenticate";
import disableLogin from "login/disableLogin";
import enableSearchPage from "search/enableSearchPage";
import enableListsPage from "lists/enableListsPage";

async function authenticateAndEnableInitialPage() : Promise<void> {
  await authenticate();
  if (!isLoggedIn) return;
  await enableInitialPage();
}

async function enableInitialPage() : Promise<void> {
  disableLogin();
  enableListsPage();
  await enableSearchPage();
}

export default authenticateAndEnableInitialPage;