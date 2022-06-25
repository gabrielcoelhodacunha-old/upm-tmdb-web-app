import { sessionId } from "./authenticate"
import { BASE_API_URL, GET, POST } from "./constants"
import { apiKeyInput } from "./htmlElements"
import { HttpClient } from "./httpClient"

async function procurarFilme(query : string) {
  query = encodeURI(query)
  console.log(sessionId);
  console.log(query)
  let result = await HttpClient.get({
    url: `${BASE_API_URL}/search/movie?api_key=${apiKeyInput.value}&query=${query}`,
    method: GET
  })
  return result
}

async function adicionarFilme(filmeId : string) {
  let result = await HttpClient.get({
    url: `${BASE_API_URL}/movie/${filmeId}?api_key=${apiKeyInput.value}&language=en-US`,
    method: GET
  })
  console.log(result);
}

async function criarLista(nomeDaLista : string, descricao : string) {
  let result = await HttpClient.get({
    url: `${BASE_API_URL}/list?api_key=${apiKeyInput.value}&session_id=${sessionId}`,
    method: POST,
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId : string, listaId : string) {
  let result = await HttpClient.get({
    url: `${BASE_API_URL}/list/${listaId}/add_item?api_key=${apiKeyInput.value}&session_id=${sessionId}`,
    method: POST,
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  const listId = (document.getElementById('lista') as HTMLUListElement).nodeValue;
  let result = await HttpClient.get({
    url: `${BASE_API_URL}/list/${listId}?api_key=${apiKeyInput.value}`,
    method: GET
  })
  console.log(result);
}

export {
  procurarFilme,
  adicionarFilme,
  criarLista,
  adicionarFilmeNaLista,
  pegarLista
};