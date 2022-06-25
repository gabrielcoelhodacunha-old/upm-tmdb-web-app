import { BASE_API_URL, GET, POST } from "./constants";
import { apiKeyInput, loginInput, senhaInput } from "./htmlElements";
import { HttpClient } from "./httpClient";
let sessionId : string;

async function authenticate() {
  let requestToken = await criarRequestToken();
  await logar(requestToken);
  sessionId = await criarSessao(requestToken);
}

async function criarRequestToken() : Promise<string> {
  let result = await HttpClient.get({
    url: `${BASE_API_URL}/authentication/token/new?api_key=${apiKeyInput.value}`,
    method: GET
  });
  return result.request_token
}

async function logar(requestToken : string) {
  await HttpClient.get({
    url: `${BASE_API_URL}/authentication/token/validate_with_login?api_key=${apiKeyInput.value}`,
    method: POST,
    body: {
      username: loginInput.value,
      password: senhaInput.value,
      request_token: `${requestToken}`
    }
  });
}

async function criarSessao(requestToken : string) : Promise<string> {
  let result = await HttpClient.get({
    url: `${BASE_API_URL}/authentication/session/new?api_key=${apiKeyInput.value}&request_token=${requestToken}`,
    method: GET
  });
  return result.session_id;
}

export { authenticate, sessionId };