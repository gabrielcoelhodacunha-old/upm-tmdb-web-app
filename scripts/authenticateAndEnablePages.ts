import { authenticate, isLoggedIn } from "./authenticate";
import disableLogin from "./disableLogin";
import enableListsPage from "./enableListsPage";
import enableSearchPage from "./enableSearchPage";

async function authenticateAndEnablePages() : Promise<void> {
  await authenticate();
  if (!isLoggedIn) return;
  await enablePages();
}

async function enablePages() : Promise<void> {
  disableLogin();
  await enableListsPage();
  await enableSearchPage();
}

export default authenticateAndEnablePages;