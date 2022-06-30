import { apiKeyInput, loginInput, senhaInput } from "./htmlElements";
import { GET, POST } from "./httpMethods";
import { BASE_API_URL } from "./urls";
import removeWhiteSpaces from "./removeWhiteSpaces";
import HttpClient from "./HttpClient";
import IHttpRequest from "./IHttpRequest";

let sessionId : string = "";

async function authenticate() : Promise<void> {
  try {
    const REQUEST_TOKEN = await createRequestToken();
    await login(REQUEST_TOKEN);
    await createSession(REQUEST_TOKEN);
  }
  catch { alert("Credenciais incorretas!"); }
}

async function createRequestToken() : Promise<string> {
  const URL = removeWhiteSpaces(
    `${BASE_API_URL}
    /authentication/token/new?
    api_key=${apiKeyInput.value}`
  );
  const REQUEST : IHttpRequest = { url: URL, method: GET }
  const RESULT = await HttpClient.get(REQUEST);
  return RESULT.request_token;
}

async function login(requestToken : string) : Promise<void> {
  const URL = removeWhiteSpaces(
    `${BASE_API_URL}
    /authentication/token/validate_with_login?
    api_key=${apiKeyInput.value}`
  );
  const REQUEST : IHttpRequest = {
    url: URL,
    method: POST,
    body: {
      username: loginInput.value,
      password: senhaInput.value,
      request_token: requestToken
    }
  }
  await HttpClient.get(REQUEST);
}

async function createSession(requestToken : string) : Promise<void> {
  const URL = removeWhiteSpaces(
    `${BASE_API_URL}
    /authentication/session/new?
    api_key=${apiKeyInput.value}
    &request_token=${requestToken}`
  );
  const REQUEST : IHttpRequest = { url: URL, method: GET };
  const RESULT = await HttpClient.get(REQUEST);
  sessionId = RESULT.session_id;
}

function isLoggedIn() : boolean {
  return sessionId !== "";
}

export { authenticate, sessionId, isLoggedIn };