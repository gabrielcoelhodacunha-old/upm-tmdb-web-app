import { sessionId } from "./authenticate";
import { moviesLists } from "./getMoviesLists";
import { apiKeyInput } from "./htmlElements";
import HttpClient from "./HttpClient";
import { POST } from "./httpMethods";
import IHttpRequest from "./IHttpRequest";
import IMoviesList from "./IMoviesList";
import removeWhiteSpaces from "./removeWhiteSpaces";
import { BASE_API_URL } from "./urls";

async function createList(
  name : string, description : string
) : Promise<IMoviesList | void> {
  if (moviesLists.some(list => list.name === name)) {
    return alert(`A lista '${name}' ja existe!`);
  }
  if (!name) return alert(`O campo 'Nome' deve ser preenchido!`);
  const request : IHttpRequest = {
    url: removeWhiteSpaces(
      `${BASE_API_URL}
      /list?
      api_key=${apiKeyInput.value}
      &session_id=${sessionId}`
    ),
    method: POST,
    body: {
      name: name,
      description: description,
      language: "pt-br"
    }
  };
  const response = await HttpClient.get(request);
  return {id: response.list_id, name, description} as IMoviesList;
}

export default createList;