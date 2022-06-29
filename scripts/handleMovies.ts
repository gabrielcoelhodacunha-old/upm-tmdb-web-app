import { sessionId } from "./authenticate"
import { BASE_API_URL, DELETE, GET, POST } from "./constants"
import { apiKeyInput, loginInput } from "./htmlElements"
import { HttpClient } from "./httpClient"

interface IMoviesList {
  id: number,
  name: string,
  description: string
}

let listasDeFilmes : IMoviesList[];

async function procurarFilme(query : string) {
  let result = await HttpClient.get({
    url: `${BASE_API_URL}/search/movie?api_key=${apiKeyInput.value}&query=${encodeURI(query)}`,
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

async function getMoviesLists() : Promise<void> {
  let result = await HttpClient.get({
    url: `${BASE_API_URL}/account/${loginInput.value}/lists?api_key=${apiKeyInput.value}&session_id=${sessionId}`,
    method: GET
  });
  listasDeFilmes = [];
  for (const {id, name, description} of result.results) {
    listasDeFilmes.push({id, name, description});
  }
}

async function deleteList(listId : number) {
  try {
    await HttpClient.get({
      url: `${BASE_API_URL}/list/${listId}?api_key=${apiKeyInput.value}&session_id=${sessionId}`,
      method: DELETE
    });
  } catch {};
}

async function criarLista(nomeDaLista : string, descricao : string) : Promise<IMoviesList | void> {
  if (listasDeFilmes.some(list => list.name === nomeDaLista)) {
    return alert(`A lista '${nomeDaLista}' ja existe!`);
  };
  if (!nomeDaLista) return alert(`O campo 'Nome' deve ser preenchido!`);
  let result = await HttpClient.get({
    url: `${BASE_API_URL}/list?api_key=${apiKeyInput.value}&session_id=${sessionId}`,
    method: POST,
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  return {id: result.list_id, name: nomeDaLista, description: descricao} as IMoviesList;
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
  pegarLista,
  listasDeFilmes,
  getMoviesLists,
  IMoviesList,
  deleteList
};