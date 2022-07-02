import { authenticate, isLoggedIn } from "./authenticate";
import disableLogin from "./disableLogin";
import enableSearchPage from "./enableSearchPage";

async function authenticateAndEnableInitialPage() : Promise<void> {
  await authenticate();
  if (!isLoggedIn) return;
  await enableInitialPage();
}

async function enableInitialPage() : Promise<void> {
  disableLogin();
  await enableSearchPage();
}

export default authenticateAndEnableInitialPage;