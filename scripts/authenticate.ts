import { apiKeyInput, loginInput, senhaInput } from "./htmlElements";
import { GET, POST } from "./httpMethods";
import { BASE_API_URL } from "./urls";
import removeWhiteSpaces from "./removeWhiteSpaces";
import HttpClient from "./HttpClient";
import IHttpRequest from "./IHttpRequest";

let sessionId : string = "";

async function authenticate() : Promise<void> {
  try {
    const requestToken = await createRequestToken();
    await login(requestToken);
    await createSession(requestToken);
  }
  catch { alert("Credenciais incorretas!"); }
}

async function createRequestToken() : Promise<string> {
  const request : IHttpRequest = {
    url: removeWhiteSpaces(
      `${BASE_API_URL}
      /authentication/token/new?
      api_key=${apiKeyInput.value}`
    ),
    method: GET
  }
  const response = await HttpClient.get(request);
  return response.request_token;
}

async function login(requestToken : string) : Promise<void> {
  const request : IHttpRequest = {
    url: removeWhiteSpaces(
      `${BASE_API_URL}
      /authentication/token/validate_with_login?
      api_key=${apiKeyInput.value}`
    ),
    method: POST,
    body: {
      username: loginInput.value,
      password: senhaInput.value,
      request_token: requestToken
    }
  }
  await HttpClient.get(request);
}

async function createSession(requestToken : string) : Promise<void> {
  const request : IHttpRequest = {
    url: removeWhiteSpaces(
      `${BASE_API_URL}
      /authentication/session/new?
      api_key=${apiKeyInput.value}
      &request_token=${requestToken}`
    ),
    method: GET
  };
  const response = await HttpClient.get(request);
  sessionId = response.session_id;
}

function isLoggedIn() : boolean {
  return sessionId !== "";
}

export { authenticate, sessionId, isLoggedIn };